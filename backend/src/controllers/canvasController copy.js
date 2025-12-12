import { createClient } from '@supabase/supabase-js';
import {encryptToken, decryptToken } from '../utils/encryption.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of this file and go up to the root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../');

// Load .env from root directory
dotenv.config({ path: join(rootDir, '.env') });

// Helper function to get Supabase client
const getSupabaseClient = () => {
  console.log('Environment check:', {
    supabaseUrl: process.env.SUPABASE_URL ? 'Found' : 'Missing',
    serviceKey: process.env.SUPABASE_SERVICE_KEY ? 'Found' : 'Missing'
  });
  
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
};

/**
 * Save or update user's Canvas API token and course ID (simplified version)
 * POST /api/canvas/credentials
 * Body: { userId, canvasToken, courseId }
 */
export const saveCanvasCredentials = async (req, res) => {
    try{
        
        const {userId, canvasToken, courseId} = req.body;

        if(!userId || !canvasToken || !courseId){
            return res.status(400).json({
                error: 'Missing required fields: userId, canvasToken, and courseId are all required'
            });
        }

        // Validate UUID format for userId
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId)) {
            return res.status(400).json({
                error: 'userId must be a valid UUID format'
            });
        }

        // Validate that courseId is a string and not empty
        if (typeof courseId !== 'string' || courseId.trim().length === 0) {
            return res.status(400).json({
                error: 'courseId must be a non-empty string'
            });
        }

        const encryptedToken = encryptToken(canvasToken);

        // Get Supabase client
        const supabase = getSupabaseClient();

        // First, ensure the user exists in auth.users or handle the foreign key constraint
        const { data: userCheck, error: userError } = await supabase.auth.admin.getUserById(userId);
        
        if (userError || !userCheck?.user) {
            console.error('User not found in auth.users:', userError);
            return res.status(400).json({
                error: 'User not found in authentication system',
                details: userError?.message || 'Invalid user ID'
            });
        }

        // Check if user has a profile (common Supabase pattern)
        const { data: profileCheck, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userId)
            .single();

        if (profileError && profileError.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert({ id: userId })
                .single();
            
            if (createError) {
                console.error('Failed to create user profile:', createError);
                // Continue anyway - maybe the foreign key references auth.users directly
            }
        } else if (profileError) {
            console.error('Error checking profile:', profileError);
            // Continue anyway - maybe the foreign key references auth.users directly
        }

        // Test connection by checking if the table exists
        const { data: tableTest, error: tableError } = await supabase
            .from('canvas_credentials')
            .select('id')
            .limit(1);
        
        if (tableError) {
            console.error('Table access error:', tableError);
            return res.status(500).json({
                error: 'Database connection issue',
                details: tableError.message
            });
        }

        // Check if user already has Canvas credentials
        const {data: existing, error: selectError} = await supabase
            .from('canvas_credentials')
            .select('id')
            .eq('profile_id', userId)
            .single();
        
        let result;
        if(existing){
            // Update existing credentials with new token and course_id
            result = await supabase
              .from('canvas_credentials')
              .update({
                encrypted_token: encryptedToken,
                course_id: courseId,
                updated_at: new Date().toISOString()
              })
              .eq('profile_id', userId);
        } else {
            // Insert new credentials - include id and timestamps
            result = await supabase
              .from('canvas_credentials')
              .insert({
                id: crypto.randomUUID(),
                profile_id: userId,
                encrypted_token: encryptedToken,
                course_id: courseId,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
        }

        if (result.error){
            console.error('Supabase error:', result.error);
            return res.status(500).json({
                error: 'Failed to save Canvas credentials',
                details: result.error.message
            });
        }

        // Verify the update worked by fetching the record
        const {data: verification, error: verifyError} = await supabase
            .from('canvas_credentials')
            .select('profile_id, course_id, created_at')
            .eq('profile_id', userId)
            .single();

        res.json({
            success: true,
            message: `Canvas credentials saved successfully! Course ID: ${courseId}`
        });

    } catch (error){
        console.error('ERROR in saveCanvasCredentials:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            error: 'Failed to save Canvas credentials',
            details: error.message
        });
    }
};

/**
 * Save or update use's Canvas API token
 * POST /api/canvas/token
 * Body: { userId, canvasToken }
 */
export const saveCanvasToken = async (req, res) => {
    try{
        
        const {userId, canvasToken }= req.body;

        if(!userId || !canvasToken){
            return res.status(400).json({
                error: 'Missing userId or canvasToken'
            });
        }

        const encryptedToken = encryptToken(canvasToken);

        // Get Supabase client
        const supabase = getSupabaseClient();

        //checking if user already has an canvas token before storing (I didnt even think about this before)
        const {data: existing} = await supabase
            .from('canvas_credentials')
            .select('id')
            .eq('profile_id', userId)
            .single();
        
        let result;
        if(existing){
            // Update existing token
            result = await supabase
                .from('canvas_credentials')
                .update({
                    encrypted_token: encryptedToken,
                    updated_at: new Date().toISOString()
                })
                .eq('profile_id', userId);
            } else{
                result = await supabase
                    .from('canvas_credentials')
                    .insert({
                        profile_id: userId,
                        encrypted_token: encryptedToken
                    });
            }

            if (result.error){
                console.error('Supabase error:', result.error);
                return res.status(500).json({
                    error: 'Failed to save Canvas token'
                });
            }

            res.json({
                success: true,
                message: 'Canvas token saved successfully'
            });

        }catch (error){
        console.error('ERROR in saveCanvasToken:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            error: 'Failed to save Canvas Token'
        });
    }
};

/**
 * Get user's Canvas token (for internal use)
 * @param {string} userId - User's profile ID
 * @returns {Promise<string|null>} - Decrypted Canvas token or null
 */
const getUserCanvasToken = async (userId) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('canvas_credentials')
      .select('encrypted_token')
      .eq('profile_id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return decryptToken(data.encrypted_token);
  } catch (error) {
    console.error('Error getting Canvas token:', error);
    return null;
  }
};

/**
 * Check if user has Canvas token configured
 * GET /api/canvas/status
 * Body: { userId }
 */
export const checkCanvasStatus = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        error: 'Missing userId' 
      });
    }

    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('canvas_credentials')
      .select('id, created_at')
      .eq('profile_id', userId)
      .single();

    res.json({
      hasToken: !!data,
      configuredAt: data?.created_at || null
    });

  } catch (error) {
    console.error('Error checking Canvas status:', error);
    res.json({
      hasToken: false,
      configuredAt: null
      });
  }
};

/**
 * Get user's course ID (for internal use)
 * @param {string} userId - User's profile ID
 * @returns {Promise<string|null>} - Course ID or null
 */
const getUserCourseId = async (userId) => {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { data, error } = await supabase
      .from('canvas_credentials')
      .select('course_id')
      .eq('profile_id', userId)
      .single();

    if (error || !data || !data.course_id) {
      return null;
    }

    return data.course_id;
  } catch (error) {
    console.error('Error getting course ID:', error);
    return null;
  }
};