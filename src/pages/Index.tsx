
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutGrid, Map, Users } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import FeaturedProject from '@/components/FeaturedProject';
import IntroSection from '@/components/IntroSection';

const projects = [
  {
    id: 'public\\lovable-uploads\\Screenshot 2025-04-28 220924.png',
    title: 'Forest Edge Retreat',
    location: 'Knuckles, Sri Lanka',
    image: 'public\lovable-uploads\Screenshot 2025-04-28 220924.png',
    type: 'Nature Retreat'
  }, 
  {
    id: 'jat-holdings-stall',
    title: 'JAT Holdings Stall',
    location: 'Sri Lanka Design Festival',
    image: '/lovable-uploads/43c77f58-07c0-407c-9983-cb31dc70d974.png',
    type: 'Exhibition Stall'
  }, 
  {
    id: 'aviation-voice',
    title: 'Aviation Voice',
    location: 'Nugegoda',
    image: '/lovable-uploads/15449c9f-314c-4587-b2e3-26942516db03.png',
    type: 'Office Space'
  }
];

const services = [
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    title: 'Space Planning',
    description: 'Optimizing layouts for efficiency and flow, maximizing the potential of every square foot.'
  }, 
  {
    icon: <Map className="h-6 w-6" />,
    title: 'Custom Design',
    description: 'Creating unique interior solutions tailored to your specific needs and aesthetic preferences.'
  }, 
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Project Management',
    description: 'Overseeing every aspect of your project from concept to completion, ensuring quality and timeliness.'
  }
];

const Index = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handlePreviousProject = () => {
    setCurrentProjectIndex(prev => prev > 0 ? prev - 1 : projects.length - 1);
  };
  
  const handleNextProject = () => {
    setCurrentProjectIndex(prev => prev < projects.length - 1 ? prev + 1 : 0);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <IntroSection />

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <span className="inline-block font-medium text-primary uppercase tracking-wider mb-3 text-lg">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">Comprehensive Design Solutions</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-primary/20 animate-slide-up" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-5">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact" className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300">
              <span>Discuss Your Project</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="animate-slide-up mb-6 md:mb-0">
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-3">
                Featured Work
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-medium">Our Projects</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300 animate-slide-in-right">
              <span>View All Projects</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Three Image Gallery */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row gap-4 animate-slide-up">
              
              
              
            </div>
          </div>

          <FeaturedProject 
            {...projects[currentProjectIndex]} 
            description="Set deep within a lush forest canopy, this serene retreat was designed to create a sense of immersion in nature. Floor-to-ceiling glass panels, neutral tones, and minimalist décor ensure that the landscape takes center stage. Perfect for restful escapes and mindful getaways." 
            onPrevious={handlePreviousProject} 
            onNext={handleNextProject} 
            showPrevious={currentProjectIndex > 0} 
            showNext={currentProjectIndex < projects.length - 1} 
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
