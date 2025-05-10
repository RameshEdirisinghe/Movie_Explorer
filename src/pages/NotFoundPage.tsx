import { Link } from 'react-router-dom';
import { Home, Film } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <Film size={64} className="text-yellow-500 mb-6" />
      
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button className="flex items-center gap-2">
          <Home size={18} />
          <span>Return to Homepage</span>
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;