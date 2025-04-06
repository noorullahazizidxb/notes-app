import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <img
        src="/vite.svg" // Replace with a custom Not Found image if available
        alt="Not Found"
        className="w-1/2 h-auto mb-8"
      />
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;