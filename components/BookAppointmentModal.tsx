import React, { useState } from 'react';
import Modal from './Modal';
import { generateBookingConfirmation } from '../services/geminiService';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const service = formData.get('service') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const concerns = formData.get('concerns') as string;

    try {
      // Generate AI confirmation message with a minimum delay for UX
      const [message] = await Promise.all([
        generateBookingConfirmation(name, service, date, time, concerns),
        new Promise(resolve => setTimeout(resolve, 1500)) // Ensure spinner shows for at least 1.5s
      ]);
      
      setConfirmationMessage(message || "We've received your request and will see you soon!");
    } catch (error) {
      setConfirmationMessage("Your request has been received! We'll be in touch shortly.");
    }

    setIsSubmitting(false);
    setStep(2);
    
    // Auto close after showing success message
    setTimeout(() => {
      setStep(1);
      setConfirmationMessage('');
      onClose();
    }, 6000);
  };

  const inputClasses = "w-full px-5 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all duration-200 outline-none text-brand-text placeholder-gray-400 font-sans";
  const labelClasses = "block text-sm font-semibold text-gray-600 mb-2 ml-1";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={step === 1 ? "Book Your Visit" : "Success!"}>
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClasses}>Full Name</label>
            <input 
              required
              name="name"
              type="text" 
              className={inputClasses}
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className={labelClasses}>Phone Number</label>
            <input 
              required
              name="phone"
              type="tel" 
              className={inputClasses}
              placeholder="(123) 456-7890"
              pattern="[0-9\-\(\)\s]+"
            />
          </div>
          <div>
            <label className={labelClasses}>Service Needed</label>
            <select name="service" className={`${inputClasses} cursor-pointer`}>
              <option>General Checkup</option>
              <option>Teeth Cleaning</option>
              <option>Whitening</option>
              <option>Root Canal</option>
              <option>Orthodontics</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Preferred Date</label>
              <input 
                required
                name="date"
                type="date" 
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Preferred Time</label>
              <input 
                required
                name="time"
                type="time" 
                className={inputClasses}
              />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Specific Concerns</label>
            <textarea 
              name="concerns"
              rows={3}
              className={`${inputClasses} resize-none`}
              placeholder="e.g. Tooth sensitivity, anxiety about pain..."
            />
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-brand-accent hover:bg-[#d6736c] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transform active:scale-[0.99] flex items-center justify-center ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              "Request Appointment"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center py-10 px-2">
          <div className="w-20 h-20 bg-brand-green/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-2xl font-serif text-brand-text mb-3">Request Received!</h4>
          <p className="text-gray-600 font-medium italic mb-2">"{confirmationMessage}"</p>
          <p className="text-gray-400 text-xs mt-4">We'll call you shortly to confirm the exact time.</p>
        </div>
      )}
    </Modal>
  );
};

export default BookAppointmentModal;