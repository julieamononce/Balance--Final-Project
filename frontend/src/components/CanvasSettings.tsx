import { useState } from 'react';
import { saveCanvasCredentials } from '../services/canvasApi';

interface CanvasSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CanvasSettingsModal = ({ isOpen, onClose }: CanvasSettingsModalProps) => {
  const [canvasToken, setCanvasToken] = useState('');
  const [courseId, setCourseId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!canvasToken.trim()) {
      setError('Please enter your Canvas API token');
      return;
    }

    if (!courseId.trim()) {
      setError('Please enter your course ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await saveCanvasCredentials(canvasToken, courseId);
      
      if (result.success) {
        setSuccess(true);
        // Auto-close after 1.5 seconds
        setTimeout(() => {
          onClose();
          setCanvasToken('');
          setCourseId('');
          setSuccess(false);
        }, 1500);
      } else {
        setError(result.error || 'Failed to save Canvas credentials');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCanvasToken('');
    setCourseId('');
    setError('');
    setSuccess(false);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed background */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={handleClose}
      />
      
      {/* Modal card */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Canvas Settings</h2>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <label htmlFor="canvasToken" className="block text-sm font-medium text-gray-700 mb-2">
              Canvas API Token
            </label>
            <input
              id="canvasToken"
              type="text"
              value={canvasToken}
              onChange={(e) => setCanvasToken(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your Canvas API token"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading || success}
            />
          </div>

          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2">
              Course ID
            </label>
            <input
              id="courseId"
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your course ID (e.g., 26449)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading || success}
            />
            <p className="text-xs text-gray-500 mt-1">
              Find this in your Canvas course URL: /courses/[COURSE_ID]
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
              ✓ Canvas token saved successfully!
            </div>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={isLoading || success}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isLoading || success
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Saving...' : success ? 'Saved!' : 'Save'}
          </button>
        </div>

        {/* Helper text */}
        <div className="mt-4 text-xs text-gray-500">
          <p>Your Canvas API token will be encrypted and stored securely.</p>
        </div>
      </div>
    </div>
  );
};