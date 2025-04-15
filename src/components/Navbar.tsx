
import { useState, useEffect } from "react";
import { Menu, X, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Specials", href: "#specials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleReservation = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      toast({
        title: "Reserve Table",
        description: "Please fill out the reservation form below.",
        duration: 3000,
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img 
            src="/lovable-uploads/c3c3eaff-10b7-4ef0-b53f-1b46e0c4ac07.png" 
            alt="Taj Mahal Restaurant" 
            className="h-12 md:h-16" 
          />
          <span className={`ml-2 font-playfair text-xl md:text-2xl font-bold ${isScrolled ? 'text-taj-maroon' : 'text-white'}`}>
            Taj Mahal
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link font-medium text-sm ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button className="taj-button" onClick={handleReservation}>
            <CalendarClock className="h-4 w-4 mr-2" />
            Reserve Table
          </Button>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`ml-2 p-2 ${isScrolled ? "text-taj-maroon" : "text-white"}`}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 animate-fade-up">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 py-2 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <Button className="taj-button w-full flex items-center justify-center" onClick={handleReservation}>
              <CalendarClock className="h-4 w-4 mr-2" />
              Reserve Table
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
