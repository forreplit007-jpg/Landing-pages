import React, { useState, useEffect } from 'react';
import { FlowerIcon, PhoneIcon, ToothIcon, ShieldCheckIcon, UsersIcon, ClockIcon } from './components/Icons';
import ChatWidget from './components/ChatWidget';
import BookAppointmentModal from './components/BookAppointmentModal';
import TestimonialSlider from './components/TestimonialSlider';
import SlideButton from './components/SlideButton';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = () => setModalOpen(true);

  return (
    <div className="min-h-screen w-full bg-white text-brand-text overflow-x-hidden font-sans">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
             {/* Logo */}
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-green flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
             </div>
             <span className="font-serif text-2xl font-bold tracking-tight text-gray-900">Rainbow Clove</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide text-gray-800">
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
              className="hover:text-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent rounded px-2"
            >
              Home
            </button>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
              className="hover:text-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent rounded px-2"
            >
              About
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})} 
              className="hover:text-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent rounded px-2"
            >
              Services
            </button>
            <button 
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({behavior: 'smooth'})} 
              className="hover:text-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent rounded px-2"
            >
              Reviews
            </button>
          </div>
          
          <button 
            onClick={openBooking} 
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen relative overflow-hidden flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
            style={{ transform: `translate3d(0, ${scrollY * 0.2}px, 0)` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=2800" 
              alt="Relaxing Dental Clinic Interior" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Gradient Overlay: Solid on left for text readability, fading to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-pink via-brand-pink/95 to-brand-pink/20"></div>
        </div>

        {/* Content Container matching Navbar */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-32 pb-12 relative z-10">
          
          {/* Text Content */}
          <div className="w-full max-w-4xl flex flex-col items-start relative z-10">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-800 mb-6 opacity-80">
              Rainbow Clove <br /> Dental Clinic
            </p>
            
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 tracking-tight animate-hero-entry pb-2">
              Your dental health journey begins here.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-md leading-relaxed font-medium">
              Our job is to make it as comfortable and pain-free as possible! We believe a smile is the best accessory you can wear.
            </p>
            
            <div className="flex flex-wrap gap-4 w-full sm:w-auto items-center">
              <SlideButton 
                mainText="Get Started"
                hoverText="Today"
                onClick={openBooking} 
                bgColor="#E3FDC5"
                textColor="#181818"
                shadowColor="#bce092"
                className="flex-1 sm:flex-none h-[60px] text-lg"
              />
              
              <SlideButton 
                mainText="Book Appointment"
                hoverText="Now"
                onClick={openBooking}
                bgColor="#E8847D"
                textColor="#ffffff"
                shadowColor="#c95f57"
                className="flex-1 sm:flex-none h-[60px] text-lg"
              />
            </div>
          </div>

        </div>
      </header>

      {/* About / Intro Section */}
      <section id="about" className="flex flex-col md:flex-row scroll-mt-28">
        <div className="md:w-1/2 h-[500px] md:h-auto relative">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
            alt="Modern dental clinic interior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 bg-brand-green flex flex-col justify-center px-8 md:px-20 py-20">
          <p className="text-brand-text mb-8 leading-relaxed text-lg md:text-xl font-light">
            We believe that visiting the dentist should be a refreshing experience. Our clinic combines state-of-the-art technology with a warm, welcoming atmosphere designed to put you at ease from the moment you walk through our doors.
          </p>
          <div>
            <button 
              onClick={() => document.getElementById('values')?.scrollIntoView({behavior: 'smooth'})}
              className="bg-brand-pink hover:bg-[#ffc2bd] text-brand-text px-8 py-3 rounded-full font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-text"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-24 px-6 md:px-20 bg-white scroll-mt-28">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-accent mb-16 max-w-2xl">
          We take pride in how we do our work.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "We are patient-focused.", desc: "Your comfort is our top priority. We listen to your concerns and tailor every treatment to your specific needs." },
            { title: "We value quality service.", desc: "Using only the highest quality materials and the latest dental techniques to ensure your smile lasts a lifetime." },
            { title: "We care about comfort.", desc: "From our waiting room to our chairs, every detail is designed to reduce anxiety and promote relaxation." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-start">
              <FlowerIcon className="w-10 h-10 text-brand-green mb-6" />
              <h3 className="text-xl font-serif text-brand-accent mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="flex flex-col md:flex-row-reverse scroll-mt-28">
        <div className="md:w-1/2 h-[50vh] md:h-auto bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
            alt="Dentist working with patient" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 bg-brand-pink flex flex-col justify-center px-8 md:px-20 py-20">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-text mb-10">
            We offer a wide range of dental services.
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 mb-10">
            {['Routine Checkups & Hygiene', 'Cosmetic Whitening', 'Orthodontics & Aligners', 'Pediatric Dentistry', 'Emergency Care'].map((service, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-brand-text rounded-full"></span>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Feature Product */}
      <section className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-[50vh] md:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1609840114035-1c99d59242cc?auto=format&fit=crop&q=80&w=1200" 
            alt="Professional teeth cleaning tools" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 bg-brand-green flex flex-col justify-center px-8 md:px-20 py-20">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-accent mb-8">
            Teeth Cleaning
          </h2>
          <p className="text-gray-700 mb-10 leading-relaxed text-lg">
             Regular professional teeth cleaning is vital for maintaining healthy gums and teeth. Our gentle hygienists remove plaque and tartar buildup that regular brushing can't reach, leaving your mouth feeling fresh and rejuvenated.
          </p>
          <div>
            <button 
              onClick={openBooking}
              className="bg-brand-pink hover:bg-[#ffc2bd] text-brand-text px-8 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-text"
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 md:px-20 bg-[#FFFBFB] scroll-mt-28">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-accent mb-4">We value our patients.</h2>
          <p className="text-brand-text text-lg">We're happy to hear about their experience with us!</p>
        </div>
        
        <TestimonialSlider />
      </section>

      {/* Footer */}
      <footer className="bg-brand-green py-20 px-6 md:px-20">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-accent mb-12">
          We'd love to hear from you.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm text-gray-700">
          <div>
            <h5 className="font-bold text-brand-accent mb-4 text-lg">Address:</h5>
            <p>123 Anywhere St.<br/>Any City, ST 12345</p>
          </div>
          <div>
             <h5 className="font-bold text-brand-accent mb-4 text-lg">Opening Hours:</h5>
             <p className="mb-1">Mon-Fri: 9am - 6pm</p>
             <p>Sat: 10am - 2pm</p>
          </div>
          <div>
            <h5 className="font-bold text-brand-accent mb-4 text-lg">Email:</h5>
            <a href="mailto:hello@rainbowclove.com" className="hover:underline focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">hello@rainbowclove.com</a>
          </div>
          <div>
             <h5 className="font-bold text-brand-accent mb-4 text-lg">Tel:</h5>
             <a href="tel:1234567890" className="hover:underline block mb-1 focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">(123) 456-7890</a>
          </div>
           <div>
             <h5 className="font-bold text-brand-accent mb-4 text-lg">Social Media</h5>
             <a href="#" className="hover:underline block mb-1 focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">@rainbowclove</a>
             <a href="#" className="hover:underline block focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">@reallygreatsite</a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-green-200 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
           <p>Government prescribed health protocols are observed.</p>
           <p className="mt-2 md:mt-0">© 2024 Rainbow Clove Dental Clinic</p>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <ChatWidget />
      
      {/* Booking Modal */}
      <BookAppointmentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default App;