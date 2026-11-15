
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/26300b1a-77c4-4264-9f57-63d05b78a0b7.png')" }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white font-medium mb-6 animate-fade-in">
          Interior Design Excellence
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto animate-slide-up">
          Creating beautiful and functional spaces that reflect your unique style and needs
        </p>
        <button 
          onClick={scrollToContent} 
          className="animate-bounce absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-300"
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
