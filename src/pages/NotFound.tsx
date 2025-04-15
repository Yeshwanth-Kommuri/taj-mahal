import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-taj-cream">
      <div className="text-center p-8 max-w-md">
        <img 
          src="/lovable-uploads/c3c3eaff-10b7-4ef0-b53f-1b46e0c4ac07.png" 
          alt="Taj Mahal Restaurant" 
          className="h-24 mx-auto mb-6 animate-float"
        />
        <h1 className="text-5xl font-bold mb-4 text-taj-maroon font-playfair">404</h1>
        <p className="text-xl text-gray-700 mb-6">The page you are looking for seems to have wandered off our menu.</p>
        <a 
          href="/" 
          className="taj-button inline-block"
        >
          Return to Our Restaurant
        </a>
      </div>
    </div>
  );
};

export default NotFound;
