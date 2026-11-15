
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface FeaturedProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

const FeaturedProject = ({
  id,
  title,
  description,
  image,
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true
}: FeaturedProjectProps) => {
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative rounded-sm sm:rounded-md overflow-hidden aspect-[4/3] bg-gray-100">
          <img 
            src="/lovable-uploads/Screenshot 2025-04-28 220924.png" 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
            loading="eager" 
          />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-light">{title}</h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <Link 
              to={`/projects/${id}`}
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300"
            >
              View Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Small Project Gallery */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="aspect-[16/9] rounded-sm sm:rounded-md overflow-hidden">
          <img 
            alt={`${title} detail 1`} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
            src="/lovable-uploads/8f4e2787-7f87-42de-ba85-efc31f8d9eae.png" 
          />
        </div>
        <div className="aspect-[16/9] rounded-sm sm:rounded-md overflow-hidden hidden sm:block">
          <img 
            src="/lovable-uploads/69ee228e-2645-4900-ad10-280f93663bb4.png" 
            alt={`${title} detail 2`} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
          />
        </div>
        <div className="aspect-[16/9] rounded-sm sm:rounded-md overflow-hidden hidden sm:block">
          <img 
            src="/lovable-uploads/365ff580-8bb9-48e2-ad90-144069bfad6d.png" 
            alt={`${title} detail 3`} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-2 sm:px-4">
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full bg-white/90 backdrop-blur-sm ${!showPrevious && 'invisible'} pointer-events-auto`} 
          onClick={onPrevious} 
          disabled={!showPrevious}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous project</span>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full bg-white/90 backdrop-blur-sm ${!showNext && 'invisible'} pointer-events-auto`} 
          onClick={onNext} 
          disabled={!showNext}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next project</span>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProject;
