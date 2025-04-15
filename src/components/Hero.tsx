
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = '';

      // Add animation to each letter
      Array.from(text).forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = 'all 0.3s ease';
        span.style.transitionDelay = `${i * 0.05}s`;
        titleRef.current?.appendChild(span);
      });

      // Start the animation
      setTimeout(() => {
        const spans = titleRef.current?.querySelectorAll('span');
        spans?.forEach(span => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
      }, 100);
    }
  }, []);

  return (
    <div 
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <div className="flex justify-center mb-10">
          <img 
            src="/lovable-uploads/c3c3eaff-10b7-4ef0-b53f-1b46e0c4ac07.png" 
            alt="Taj Mahal Restaurant Logo" 
            className="h-32 md:h-40 animate-float"
          />
        </div>
        
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          Taj Mahal Restaurant
        </h1>
        
        <h2 className="text-lg md:text-xl text-taj-gold mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Authentic Indian Cuisine in Boulogne-sur-Mer
        </h2>
        
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <a 
            href="#menu" 
            className="taj-button inline-flex items-center gap-2"
          >
            Explore Menu
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce-subtle"
      >
        <ChevronDown size={32} />
      </a>
      
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-taj-gold rounded-full blur-[150px] opacity-20 animate-spin-slow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-taj-maroon rounded-full blur-[180px] opacity-20 animate-spin-slow"></div>
    </div>
  );
}
