
import { useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium mb-4 sm:mb-6 animate-slide-up">Get in Touch</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Have a project in mind or need design consultation? I'm here to help. Reach out using the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="order-2 lg:order-1 animate-slide-up">
              <h2 className="text-2xl sm:text-3xl font-display font-medium mb-6">Contact Information</h2>
              <div className="section-divider mb-8"></div>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                    <MapPin size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base sm:text-lg mb-1">Office Address</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      123 Design Street, Colombo<br />
                      Sri Lanka
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base sm:text-lg mb-1">Email</h3>
                    <a href="mailto:dinnerli.fer@gmail.com" className="text-muted-foreground text-sm sm:text-base hover:text-primary transition-colors break-all">
                      dinnerli.fer@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                    <Phone size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base sm:text-lg mb-1">Phone</h3>
                    <a href="tel:+94764052630" className="text-muted-foreground text-sm sm:text-base hover:text-primary transition-colors">
                      +94 764 052 630
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
                <h3 className="font-display font-medium text-lg sm:text-xl mb-4">Working Hours</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="order-1 lg:order-2 animate-slide-up">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-display font-medium mb-6">Send a Message</h2>
                <div className="section-divider mb-8"></div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
