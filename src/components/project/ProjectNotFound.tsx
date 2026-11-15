
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProjectNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-display font-medium mb-4">404</h1>
      <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
      <p className="text-2xl font-medium mb-4">Project Not Found</p>
      <p className="text-muted-foreground mb-10 text-center max-w-md">
        The project you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/projects" 
        className="inline-flex items-center px-8 py-3 bg-black hover:bg-black/90 text-white font-medium rounded-none transition-colors duration-300"
      >
        <ArrowLeft size={16} className="mr-2" />
        <span>Back to Projects</span>
      </Link>
    </div>
  );
};

export default ProjectNotFound;
