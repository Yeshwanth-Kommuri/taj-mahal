
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/c3c3eaff-10b7-4ef0-b53f-1b46e0c4ac07.png" 
                alt="Taj Mahal Restaurant" 
                className="h-16" 
              />
              <span className="ml-2 font-playfair text-2xl font-bold">Taj Mahal</span>
            </div>
            <p className="text-gray-400 mb-6">
              Experience authentic Indian cuisine in the heart of Boulogne-sur-Mer.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-taj-maroon transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-taj-maroon transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-taj-maroon transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="mailto:info@tajmahalrestaurant.fr" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-taj-maroon transition-colors duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Contact Information
              <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-taj-gold"></span>
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>2 Rue du Château, 62200 Boulogne-sur-Mer, France</li>
              <li>+33 3 21 80 16 68</li>
              <li>info@tajmahalrestaurant.fr</li>
              <li>
                <span className="block">Mon-Sun: 12:00 - 14:30</span>
                <span className="block ml-16">19:00 - 22:30</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-taj-gold"></span>
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-taj-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-taj-gold transition-colors">About Us</a></li>
              <li><a href="#menu" className="hover:text-taj-gold transition-colors">Menu</a></li>
              <li><a href="#specials" className="hover:text-taj-gold transition-colors">Special Menus</a></li>
              <li><a href="#contact" className="hover:text-taj-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Opening Hours
              <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-taj-gold"></span>
            </h3>
            <table className="w-full text-gray-400">
              <tbody>
                <tr>
                  <td className="py-2">Monday</td>
                  <td className="py-2 text-right">12:00 - 14:30, 19:00 - 22:30</td>
                </tr>
                <tr>
                  <td className="py-2">Tuesday</td>
                  <td className="py-2 text-right">12:00 - 14:30, 19:00 - 22:30</td>
                </tr>
                <tr>
                  <td className="py-2">Wednesday</td>
                  <td className="py-2 text-right">12:00 - 14:30, 19:00 - 22:30</td>
                </tr>
                <tr>
                  <td className="py-2">Thursday</td>
                  <td className="py-2 text-right">12:00 - 14:30, 19:00 - 22:30</td>
                </tr>
                <tr>
                  <td className="py-2">Friday</td>
                  <td className="py-2 text-right">12:00 - 14:30, 19:00 - 22:30</td>
                </tr>
                <tr>
                  <td className="py-2">Weekend</td>
                  <td className="py-2 text-right">12:00 - 14:30, 19:00 - 22:30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Taj Mahal Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
