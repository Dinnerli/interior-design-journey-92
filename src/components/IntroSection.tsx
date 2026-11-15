
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';

const IntroSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="animate-slide-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-4 sm:mb-6 lg:mb-8 text-left font-medium">
                Transforming Spaces<br />
                Elevating Lives
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Step into a world where the art of Interior Design is meticulously crafted to bring together timeless elegance and cutting-edge modern Innovation, Allowing you to transform your living spaces into the epitome of luxury and sophistication
              </p>
            </div>
            <Link to="/contact" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-medium rounded-none hover:bg-primary/90 transition-colors duration-300 animate-slide-up">
              Contact Us
            </Link>
          </div>
          <div className="relative animate-slide-up mt-8 lg:mt-0">
            <AspectRatio ratio={4 / 3} className="bg-muted">
              <img 
                alt="Luxurious living room with modern furniture and natural lighting" 
                src="/lovable-uploads/008b41b4-35c0-4879-aecc-c91cddbbb882.png" 
                className="object-cover w-full h-full rounded-sm sm:rounded-md transition-transform duration-300 hover:scale-105" 
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
