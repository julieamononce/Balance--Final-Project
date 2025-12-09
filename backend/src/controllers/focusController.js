// Simplified Canvas integration for Focus Mode - course ID approach
import { fetchCourseAssignments } from '../services/canvasService.js';
import { sendToOpenAI } from '../services/openAIService.js';
import focusPrompt from '../prompts/focusPrompts.js';

export const processFocusMessage = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: "Missing message or userId" });
    }

    // Detect Canvas-related requests
    const isCanvasRequest = message.toLowerCase().includes("canvas") || 
                           message.toLowerCase().includes("assignments") ||
                           message.toLowerCase().includes("assignment") ||
                           message.toLowerCase().includes("homework") ||
                           message.toLowerCase().includes("due");

    console.log('Canvas request detected:', isCanvasRequest, 'for message:', message);

    let systemPrompt = focusPrompt;
    let canvasData = null;

    if (isCanvasRequest) {
      // Get Canvas assignments using stored course ID
      canvasData = await getCanvasAssignments(userId);
      
      if (canvasData.success) {
        // Use Canvas assistant prompt when we have assignment data
        systemPrompt = `You are a helpful Canvas assistant that answers questions based on my course assignments below. Suggest when to start their assignment based on the context and help them plan their work effectively.

${canvasData.context}

Please provide specific, actionable advice about the assignments and help with planning and prioritization.`;
      }
    }

    // Prepare the full prompt for OpenAI
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nAI:`;

    console.log('About to send to OpenAI...');
    const reply = await sendToOpenAI(fullPrompt);
    console.log('Received reply from OpenAI:', reply);

    res.json({
      reply,
      canvasData: canvasData || null,
      hasCanvasData: !!canvasData?.success
    });

  } catch (error) {
    console.error("Focus controller error:", error);
    res.status(500).json({ error: "Failed to process focus message" });
  }
};

/**
 * Get Canvas assignments for user's configured course
 */
const getCanvasAssignments = async (userId) => {
  try {
    const canvasToken = await getUserCanvasToken(userId);
    if (!canvasToken) {
      return {
        success: false,
        context: "Canvas token not found. Please add your Canvas API token in Settings first."
      };
    }

    const courseId = await getUserCourseId(userId);
    if (!courseId) {
      return {
        success: false,
        context: "Course ID not found. Please add your course ID in Canvas Settings first."
      };
    }

    console.log('Fetching assignments for course:', courseId);
    const assignmentData = await fetchCourseAssignments(canvasToken, courseId);
    
    return assignmentData;
  } catch (error) {
    console.error("Error getting Canvas assignments:", error);
    return {
      success: false,
      context: "Sorry, I couldn't access your Canvas assignments. Please check your settings."
    };
  }
};

/**
 * Get user's Canvas token from database
 */
const getUserCanvasToken = async (userId) => {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const { decryptToken } = await import('../utils/encryption.js');
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
    
    const { data, error } = await supabase
      .from('canvas_credentials')
      .select('encrypted_token')
      .eq('profile_id', userId)
      .single();

    if (error || !data) {
      console.log('No Canvas token found for user:', userId);
      return null;
    }

    return decryptToken(data.encrypted_token);
  } catch (error) {
    console.error('Error getting Canvas token:', error);
    return null;
  }
};

/**
 * Get user's course ID from database
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