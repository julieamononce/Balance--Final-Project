import { supabase } from '../src/auth/supabaseClient';

const API_BASE = 'http://localhost:5001/api'; 

/**
 * Save user's Canvas API token and course ID
 */
export const saveCanvasCredentials = async (canvasToken: string, courseId: string): Promise<{ success: boolean; message: string; error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Use the new credentials endpoint that saves both token and course ID
    const response = await fetch(`${API_BASE}/canvas/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        canvasToken: canvasToken.trim(),
        courseId: courseId.trim()
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to save Canvas credentials');
    }

    return {
      success: true,
      message: 'Canvas token and course ID saved successfully!'
    };
  } catch (error) {
    console.error('Error saving Canvas credentials:', error);
    return {
      success: false,
      message: 'Failed to save Canvas credentials',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};



