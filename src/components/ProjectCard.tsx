
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  type: string;
  client?: string;
  index: number;
}

const ProjectCard = ({
  id,
  title,
  location,
  image
}: ProjectCardProps) => {
  // Map the old id format to the new one if needed
  let projectId = id;
  if (id === 'public\\lovable-uploads\\Screenshot 2025-04-28 220924.png') {
    projectId = 'no66-residential-home';
  }

  return (
    <div className="w-full">
      <Link 
        to={`/projects/${projectId}`} 
        className="block group"
      >
        {/* Project Image */}
        <div className="overflow-hidden rounded-sm mb-3">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        
        {/* Project Info */}
        <div className="text-left">
          <h3 className="text-neutral-900 font-medium mb-0.5 text-sm sm:text-base">{title}</h3>
          <p className="text-xs sm:text-sm text-neutral-600">{location}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
