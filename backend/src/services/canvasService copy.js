//This service handles all Canvas API interactions
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of this file and go up to the root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../');

// Load .env from root directory
dotenv.config({ path: join(rootDir, '.env') });

const CANVAS_DOMAIN = process.env.CANVAS_DOMAIN;

/**
 * Fetch assignments for a specific course ID - simplified approach
 * @param {string} canvasToken - User's Canvas API token
 * @param {string} courseId - Single course ID
 * @returns {Promise<Object>} - Object with formatted assignment context
 */
export const fetchCourseAssignments = async (canvasToken, courseId) => {
  try {
    console.log(`Fetching assignments for course ${courseId}...`);
    console.log(`Canvas Domain: ${CANVAS_DOMAIN}`);
    console.log(`Token length: ${canvasToken?.length}`);
    console.log(`Token starts with: ${canvasToken?.substring(0, 10)}...`);
    
    const assignmentUrl = `${CANVAS_DOMAIN}/api/v1/courses/${courseId}/assignments`;
    console.log(`Full URL: ${assignmentUrl}`);
    
    const response = await fetch(assignmentUrl, {
      headers: {
        'Authorization': `Bearer ${canvasToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Canvas API Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Canvas API Error Response:', errorText);
      throw new Error(`Canvas API error: ${response.status} ${response.statusText}`);
    }

    const assignments = await response.json();
    console.log(`Found ${assignments.length} assignments`);
    
    // Build context string like your prototype
    const context = assignments.map(assignment => {
      const cleanDescription = assignment.description?.replace(/<[^>]*>/g, '') || 'No description';
      return `Assignment: ${assignment.name}
Due Date: ${assignment.due_at || 'No due date'}
Points: ${assignment.points_possible || 'Not specified'}
Description: ${cleanDescription}`;
    }).join('\n\n');
    
    return {
      success: true,
      context,
      assignments: assignments.map(assignment => ({
        id: assignment.id,
        name: assignment.name,
        due_at: assignment.due_at,
        points_possible: assignment.points_possible,
        html_url: assignment.html_url
      }))
    };
  } catch (error) {
    console.error('Error fetching course assignments:', error);
    return {
      success: false,
      context: `Sorry, I couldn't access assignments for course ${courseId}. Please check your Canvas token and course ID.`,
      assignments: []
    };
  }
};







