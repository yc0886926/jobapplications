import React from 'react';

interface JobApplicationsViewProps {
  onGenerate: () => void;
}

const JobApplicationsView: React.FC<JobApplicationsViewProps> = ({ onGenerate }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
      <p className="text-gray-600 mb-4">Job applications view is being developed.</p>
      <button
        onClick={onGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate
      </button>
    </div>
  );
};

export { JobApplicationsView };