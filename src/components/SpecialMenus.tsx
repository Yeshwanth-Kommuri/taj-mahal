
import { useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const specialMenus = [
  {
    id: "vegetarian",
    name: "Vegetarian Menu",
    price: "€20.02",
    description: "Served with a plain or cheesy nan",
    details: [
      {
        title: "Choice of Starter",
        items: ["Raita", "Mix Donuts", "Baja Baigan"]
      },
      {
        title: "Main Course",
        items: ["Vegetable dishes of your choice from the menu served with basmati rice"]
      },
      {
        title: "Dessert",
        items: ["Halwa", "Sorbet"]
      }
    ],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "rajasthan",
    name: "Menu Rajasthan",
    price: "€25.77",
    description: "A taste of royal Rajasthani cuisine",
    details: [
      {
        title: "Choice of Starter",
        items: ["Tandoori Chicken", "Sheikh Kabab", "Samosa", "Onion Baja"]
      },
      {
        title: "Dishes of your choice",
        items: ["Chicken Tikka Masala", "Lamb Curry", "Chicken Shahi Korma"]
      },
      {
        title: "Dessert",
        items: ["Halwa", "Sorbet"]
      }
    ],
    image: "https://images.unsplash.com/photo-1543826173-70651703c5a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: "taj",
    name: "Taj Menu",
    price: "€60.96",
    description: "For 2 people or more",
    details: [
      {
        title: "No, your choice in the menu",
        items: ["Starter and main courses of your choice from the menu"]
      },
      {
        title: "Exclusions",
        items: ["Except prawns and shahi mix grill"]
      },
      {
        title: "Accompaniment",
        items: ["Safrêne Rice"]
      }
    ],
    image: "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

export default function SpecialMenus() {
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
      id="specials"
      ref={sectionRef}
      className="py-20 bg-taj-cream relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="taj-heading text-3xl md:text-4xl mb-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.1s" }}>
            Our Special Menus
          </h2>
          <p className="text-gray-700 mb-8 animate-on-scroll opacity-0" style={{ transitionDelay: "0.2s" }}>
            Experience our chef's specially curated menus that offer a perfect balance of flavors and a complete dining experience.
          </p>
        </div>

        {/* Special Menus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specialMenus.map((menu, index) => (
            <div 
              key={menu.id}
              className="taj-card overflow-hidden group animate-on-scroll opacity-0"
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={menu.image} 
                  alt={menu.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{menu.name}</h3>
                  <p className="text-taj-gold font-semibold">{menu.price}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">{menu.description}</p>
                
                {menu.details.map((detail, i) => (
                  <div key={i} className="mb-4">
                    <h4 className="font-bold text-sm text-taj-maroon mb-2">{detail.title}</h4>
                    <ul className="space-y-1">
                      {detail.items.map((item, j) => (
                        <li key={j} className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-taj-gold mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a href="#contact" className="inline-flex items-center text-taj-maroon font-semibold group">
                    <span>Book This Menu</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-taj-gold/30 rounded-full blur-[100px]"></div>
    </section>
  );
}
