
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import projectsData from '@/data/projectsData';

// Convert the projectsData object to an array and limit to 6 projects
const projects = Object.entries(projectsData)
  .map(([id, project]) => ({
    id,
    title: project.title,
    location: project.location,
    image: project.image || '/lovable-uploads/897e652d-9318-42ec-8ddd-2361da3857af.png', // Use default image if none exists
    type: project.type,
    size: project.size,
    client: project.client,
  }))
  .slice(0, 6); // Limit to 6 projects

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-28 md:py-32">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-medium mb-4"
          >
            Our Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-600 max-w-2xl mx-auto px-4 text-sm sm:text-base"
          >
            Explore our portfolio of completed interior design projects across various spaces 
            and industries. Each project reflects our commitment to excellence and innovation.
          </motion.p>
        </div>

        {/* Projects Grid - Each card is independent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-10 sm:gap-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col"
            >
              <ProjectCard {...project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
