import { createClient } from '@supabase/supabase-js';
import {encryptToken, decryptToken } from '../utils/encryption.js';
import dotenv from 'dotenv';
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
        console.log('Canvas credentials request received:', { 
            userId: req.body.userId, 
            hasToken: !!req.body.canvasToken, 
            courseId: req.body.courseId 
        });
        
        const {userId, canvasToken, courseId} = req.body;

        if(!userId || !canvasToken){
            console.log('Missing data - userId:', userId, 'canvasToken:', !!canvasToken);
            return res.status(400).json({
                error: 'Missing userId or canvasToken'
            });
        }

        // For now, just save the token and log the course ID
        console.log('Course ID to save:', courseId);
        
        console.log('About to encrypt token...');
        const encryptedToken = encryptToken(canvasToken);
        console.log('Token encrypted successfully');

        // Get Supabase client
        console.log('Getting Supabase client...');
        const supabase = getSupabaseClient();
        console.log('Supabase client created');

        // Check if user already has Canvas credentials
        console.log('Checking for existing credentials for user:', userId);
        const {data: existing, error: selectError} = await supabase
            .from('canvas_credentials')
            .select('id')
            .eq('profile_id', userId)
            .single();
        
        console.log('Existing check result:', { existing, selectError });
        
        let result;
        if(existing){
            console.log('Updating existing credentials for user:', userId);
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
            console.log('Inserting new credentials for user:', userId);
            // Insert new credentials
            result = await supabase
              .from('canvas_credentials')
              .insert({
                profile_id: userId,
                encrypted_token: encryptedToken,
                course_id: courseId
              });
        }
        
        console.log('Database operation result:', { data: result.data, error: result.error });

        if (result.error){
            console.error('Supabase error:', result.error);
            console.error('Error details:', JSON.stringify(result.error, null, 2));
            return res.status(500).json({
                error: 'Failed to save Canvas credentials',
                details: result.error.message
            });
        }

        // Verify the update worked by fetching the record
        console.log('Verifying the saved data...');
        const {data: verification, error: verifyError} = await supabase
            .from('canvas_credentials')
            .select('profile_id, course_id, created_at')
            .eq('profile_id', userId)
            .single();
        
        console.log('Verification result:', { verification, verifyError });

        // For now, store course ID in a separate way or skip it
        console.log('Token saved successfully, course ID should be:', courseId);

        res.json({
            success: true,
            message: `Canvas credentials saved successfully! Course ID: ${courseId}`,
            debug: {
                userId: userId,
                courseId: courseId,
                updateResult: result.data,
                verificationData: verification
            }
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
        console.log('Canvas token request received:', { userId: req.body.userId, hasToken: !!req.body.canvasToken });
        
        const {userId, canvasToken }= req.body;

        if(!userId || !canvasToken){
            console.log('Missing data - userId:', userId, 'canvasToken:', !!canvasToken);
            return res.status(400).json({
                error: 'Missing userId or canvasToken'
            });
        }

        console.log('About to encrypt token...');

        console.log('About to encrypt token...');
        const encryptedToken = encryptToken(canvasToken);
        console.log('Token encrypted successfully');

        // Get Supabase client
        console.log('Getting Supabase client...');
        const supabase = getSupabaseClient();
        console.log('Supabase client created');

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
      console.log('No course ID found for user:', userId);
      return null;
    }

    return data.course_id;
  } catch (error) {
    console.error('Error getting course ID:', error);
    return null;
  }
};