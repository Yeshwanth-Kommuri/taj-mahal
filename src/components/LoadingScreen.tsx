
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onFinished: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        onFinished();
      }
    }, 20);
    
    return () => clearTimeout(timer);
  }, [progress, onFinished]);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-taj-maroon">
      <img 
        src="/lovable-uploads/c3c3eaff-10b7-4ef0-b53f-1b46e0c4ac07.png" 
        alt="Taj Mahal Restaurant" 
        className="h-32 md:h-40 mb-8 animate-float"
      />
      
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-playfair">
        Taj Mahal Restaurant
      </h2>
      
      <div className="w-64 md:w-80 bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
        <div 
          className="bg-taj-gold h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-taj-gold">{progress}%</p>
    </div>
  );
}
