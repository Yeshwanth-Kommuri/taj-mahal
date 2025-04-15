import { useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xdkejqar", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        const name = formData.get("name") as string;
        const date = formData.get("date") as string;
        const guests = formData.get("guests") as string;

        toast({
          title: "Reservation Sent!",
          description: `Thank you ${name}! Your table for ${guests} guests has been requested for ${date}. We'll be in touch shortly.`,
          duration: 6000,
        });

        form.reset();
      } else {
        toast({
          title: "Oops!",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Formspree Error:", error);
      toast({
        title: "Network Error",
        description: "Unable to send reservation. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="taj-heading text-3xl md:text-4xl mb-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.1s" }}>
            Contact Us
          </h2>
          <p className="text-gray-700 animate-on-scroll opacity-0" style={{ transitionDelay: "0.2s" }}>
            We look forward to serving you at Taj Mahal. Make a reservation or stop by for a culinary adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: "0.3s" }}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 h-72">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.9300091555734!2d1.613111!3d50.725711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dc2c5dc78b98e7%3A0xd95c328a6a3c589a!2s2%20Rue%20du%20Ch%C3%A2teau%2C%2062200%20Boulogne-sur-Mer%2C%20France!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant Location"
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-taj-gold mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600 text-sm">
                        2 Rue du Château,<br />
                        62200 Boulogne-sur-Mer,<br />
                        France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-taj-gold mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600 text-sm">
                        +33 3 21 80 16 68
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-taj-gold mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">
                        info@tajmahalrestaurant.fr
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-taj-gold mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Hours</h3>
                      <p className="text-gray-600 text-sm">
                        Mon-Sun: 12:00 - 14:30<br />
                        19:00 - 22:30
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: "0.4s" }}>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Make a Reservation</h3>
              
              <form className="space-y-4" onSubmit={handleSubmitReservation}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input id="name" name="name" placeholder="John Doe" required className="bg-gray-50" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-gray-50" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" placeholder="+33 6 XX XX XX XX" required className="bg-gray-50" />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date & Time
                    </label>
                    <Input id="date" name="date" type="datetime-local" required className="bg-gray-50" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <Input id="guests" name="guests" type="number" min="1" placeholder="2" required className="bg-gray-50" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Any special requests or dietary requirements..." 
                    className="bg-gray-50"
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="taj-button w-full gap-2">
                  <Send className="h-4 w-4" />
                  <span>Make Reservation</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-40 -left-20 w-80 h-80 bg-taj-gold/20 rounded-full blur-[80px]"></div>
    </section>
  );
}