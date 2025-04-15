
import { useEffect, useRef } from "react";
import { Utensils, Clock, Phone, MapPin } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-taj-cream relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="taj-heading text-3xl md:text-4xl mb-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.1s" }}>
            Welcome to Taj Mahal
          </h2>
          <p className="text-gray-700 mb-8 animate-on-scroll opacity-0" style={{ transitionDelay: "0.3s" }}>
            Located in the heart of Boulogne-sur-Mer, Taj Mahal offers an authentic taste of India's rich culinary traditions. Our chefs have mastered the art of blending aromatic spices and fresh ingredients to create dishes that transport you to the vibrant streets of Delhi and the royal kitchens of Rajasthan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="taj-card p-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.4s" }}>
                <Utensils className="h-10 w-10 text-taj-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Authentic Cuisine</h3>
                <p className="text-gray-600">
                  Carefully crafted recipes passed down through generations
                </p>
              </div>
              
              <div className="taj-card p-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.5s" }}>
                <Clock className="h-10 w-10 text-taj-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
                <p className="text-gray-600">
                  Mon-Sun: 12:00 - 14:30<br />
                  19:00 - 22:30
                </p>
              </div>
              
              <div className="taj-card p-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.6s" }}>
                <Phone className="h-10 w-10 text-taj-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Reservations</h3>
                <p className="text-gray-600">
                  Call us at:<br />
                  +33 3 21 80 16 68
                </p>
              </div>
              
              <div className="taj-card p-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.7s" }}>
                <MapPin className="h-10 w-10 text-taj-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Location</h3>
                <p className="text-gray-600">
                  2 Rue du Château,<br />
                  62200 Boulogne-sur-Mer, France
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 animate-on-scroll opacity-0" style={{ transitionDelay: "0.2s" }}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Taj Mahal Restaurant Interior"
                className="rounded-lg shadow-2xl object-cover h-96 w-full"
              />
              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-taj-gold rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-float">
                <span className="text-taj-maroon font-playfair font-bold">Since 1995</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-40 -left-20 w-60 h-60 bg-taj-gold/20 rounded-full blur-[60px]"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-taj-maroon/10 rounded-full blur-[80px]"></div>
    </section>
  );
}
