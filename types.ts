export interface Testimonial {
  id: number;
  name: string;
  image: string;
  quote: string;
}

export interface ServiceItem {
  text: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
