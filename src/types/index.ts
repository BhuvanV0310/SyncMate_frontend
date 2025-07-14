export interface Profile {
  id: string;
  name: string;
  age: number;
  interests: string[];
}

export interface Match {
  id: string;
  name: string;
  age: number;
  interests: string[];
  sharedInterests: string[];
  bio?: string;
  profilePicture?: string;
  location?: string;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}