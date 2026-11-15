
import { useState } from 'react';
import { Project } from '@/data/projectsData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';

interface ProjectGalleryProps {
  project: Project;
}

const ProjectGallery = ({
  project
}: ProjectGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Combine all project images into an array
  const images = [project.image, project.secondaryImage, ...(project.additionalImages || [])].filter(img => img && img !== project.image && img !== project.secondaryImage);

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    } else {
      setActiveIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    }
  };

  if (!images.length) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-display font-medium mb-6">Project Gallery</h2>
      <div className="section-divider mb-8"></div>
      
      {/* Main Image */}
      <div className="relative mb-4">
        <Card className="overflow-hidden rounded-md border-0">
          <AspectRatio ratio={16/9} className="bg-muted">
            <img 
              src={images[activeIndex]} 
              alt={`Project Gallery Image ${activeIndex + 1}`}
              className="object-cover w-full h-full rounded-md"
            />
          </AspectRatio>
        </Card>
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button 
            onClick={() => navigateGallery('prev')} 
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => navigateGallery('next')} 
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`overflow-hidden rounded-md border-2 ${activeIndex === idx ? 'border-primary' : 'border-transparent'}`}
          >
            <AspectRatio ratio={1/1} className="bg-muted">
              <img 
                src={img} 
                alt={`Thumbnail ${idx + 1}`}
                className="object-cover w-full h-full" 
              />
            </AspectRatio>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
