
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';

interface ProjectOverviewProps {
  description: string;
  images?: string[];
}

const ProjectOverview = ({
  description,
  images
}: ProjectOverviewProps) => {
  const defaultImages = [
    '/lovable-uploads/fcc0170a-b826-4e74-a289-f87454e8823e.png',
    '/lovable-uploads/cb41bf5c-62bb-47e5-b38a-cf7c63d84f38.png',
    '/lovable-uploads/3510c7cd-83ab-42a8-a4a4-34ed7adfebd2.png'
  ];
  const displayImages = images || defaultImages;
  const hasMultipleImages = displayImages.length > 3;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-display font-medium mb-6">Project Overview</h2>
      <div className="section-divider mb-8"></div>
      <p className="text-lg leading-relaxed mb-10">{description}</p>
      
      {hasMultipleImages ? (
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {displayImages.map((img, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden rounded-lg border-0 shadow hover:shadow-lg transition-shadow duration-300">
                  <AspectRatio ratio={1}>
                    <img 
                      src={img} 
                      alt={`Project Image ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </AspectRatio>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-6">
          {displayImages.slice(0, 3).map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <AspectRatio ratio={1}>
                <img 
                  src={img} 
                  alt={`Project Image ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
