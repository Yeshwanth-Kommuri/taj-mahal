
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Menu structure with categories
const menuCategories = [
  {
    id: "wines",
    name: "Wine List",
    subcategories: [
      {
        name: "Rosé Wines",
        items: [
          { name: "Côtes de Provence", price: "€25.00", quantity: "Bottle" },
          { name: "Anjou Rosé", price: "€22.00", quantity: "Bottle" },
          { name: "Tavel", price: "€28.00", quantity: "Bottle" },
        ]
      },
      {
        name: "Red Wines",
        items: [
          { name: "Bordeaux Saint-Émilion", price: "€30.00", quantity: "Bottle" },
          { name: "Côtes du Rhône", price: "€24.00", quantity: "Bottle" },
          { name: "Bourgogne Pinot Noir", price: "€35.00", quantity: "Bottle" },
        ]
      },
      {
        name: "White Wines",
        items: [
          { name: "Chablis", price: "€32.00", quantity: "Bottle" },
          { name: "Sancerre", price: "€34.00", quantity: "Bottle" },
          { name: "Alsace Riesling", price: "€26.00", quantity: "Bottle" },
        ]
      },
      {
        name: "Wines by the Pitcher",
        items: [
          { name: "House Red", price: "€12.00", quantity: "25cl" },
          { name: "House Red", price: "€20.00", quantity: "50cl" },
          { name: "House White", price: "€12.00", quantity: "25cl" },
          { name: "House White", price: "€20.00", quantity: "50cl" },
        ]
      },
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    subcategories: [
      {
        name: "Cocktails",
        items: [
          { name: "Mango Lassi Cocktail", price: "€9.00", quantity: "25cl", popular: true },
          { name: "Indian Spiced Mojito", price: "€10.00", quantity: "25cl" },
          { name: "Delhi Mule", price: "€9.50", quantity: "25cl" },
        ]
      },
    ]
  },
  {
    id: "lassi",
    name: "Lassi Indian Drinks",
    subcategories: [
      {
        name: "Traditional Lassi",
        items: [
          { name: "Sweet Lassi", price: "€5.00", quantity: "30cl", popular: true },
          { name: "Salty Lassi", price: "€5.00", quantity: "30cl" },
          { name: "Mango Lassi", price: "€6.00", quantity: "30cl", popular: true },
          { name: "Rose Lassi", price: "€6.00", quantity: "30cl" },
        ]
      },
    ]
  },
  {
    id: "beers",
    name: "Beers",
    subcategories: [
      {
        name: "Indian Beers",
        items: [
          { name: "Kingfisher", price: "€6.50", quantity: "33cl", popular: true },
          { name: "Cobra", price: "€6.50", quantity: "33cl", popular: true },
          { name: "Taj Mahal", price: "€7.00", quantity: "33cl" },
        ]
      },
      {
        name: "Other Beers",
        items: [
          { name: "Kronenbourg", price: "€5.50", quantity: "33cl" },
          { name: "Leffe", price: "€6.00", quantity: "33cl" },
        ]
      },
    ]
  },
  {
    id: "non-alcoholic",
    name: "Non-Alcoholic Beverages",
    subcategories: [
      {
        name: "Soft Drinks",
        items: [
          { name: "Coca-Cola", price: "€3.50", quantity: "33cl" },
          { name: "Sprite", price: "€3.50", quantity: "33cl" },
          { name: "Fanta", price: "€3.50", quantity: "33cl" },
          { name: "Mineral Water", price: "€4.00", quantity: "50cl" },
          { name: "Mineral Water", price: "€6.00", quantity: "100cl" },
        ]
      },
    ]
  },
  {
    id: "hot-drinks",
    name: "Hot Drinks",
    subcategories: [
      {
        name: "Indian Hot Drinks",
        items: [
          { name: "Masala Chai", price: "€4.50", quantity: "1 cup", popular: true },
          { name: "Indian Coffee", price: "€4.00", quantity: "1 cup" },
        ]
      },
      {
        name: "Other Hot Drinks",
        items: [
          { name: "Espresso", price: "€2.50", quantity: "1 cup" },
          { name: "Cappuccino", price: "€3.50", quantity: "1 cup" },
          { name: "Hot Chocolate", price: "€3.50", quantity: "1 cup" },
        ]
      },
    ]
  },
  {
    id: "breads",
    name: "Indian Breads",
    subcategories: [
      {
        name: "Traditional Breads",
        items: [
          { name: "Plain Naan", price: "€3.00", popular: true },
          { name: "Garlic Naan", price: "€3.50", popular: true },
          { name: "Cheese Naan", price: "€4.00" },
          { name: "Butter Naan", price: "€3.50" },
          { name: "Paratha", price: "€3.50" },
          { name: "Roti", price: "€2.50" },
        ]
      },
    ]
  },
  {
    id: "tandoori",
    name: "Tandoori Entrances",
    subcategories: [
      {
        name: "Tandoori Specialties",
        items: [
          { name: "Tandoori Chicken", price: "€8.00", popular: true },
          { name: "Chicken Tikka", price: "€9.00", popular: true },
          { name: "Seekh Kebab", price: "€9.00" },
          { name: "Mixed Grill", price: "€12.00" },
        ]
      },
    ]
  },
  {
    id: "veg-appetizers",
    name: "Main Vegetable Appetizers",
    subcategories: [
      {
        name: "Vegetarian Starters",
        items: [
          { name: "Vegetable Samosa", price: "€6.00", popular: true },
          { name: "Onion Bhaji", price: "€6.00", popular: true },
          { name: "Paneer Tikka", price: "€8.00" },
          { name: "Aloo Tikki", price: "€6.00" },
        ]
      },
    ]
  },
  {
    id: "chicken",
    name: "Chicken Main Courses",
    subcategories: [
      {
        name: "Chicken Specialties",
        items: [
          { name: "Butter Chicken", price: "€15.00", popular: true, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
          { name: "Chicken Tikka Masala", price: "€14.00", popular: true, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&q=80" },
          { name: "Chicken Korma", price: "€15.00" },
          { name: "Chicken Vindaloo", price: "€14.00" },
          { name: "Chicken Madras", price: "€14.00" },
          { name: "Chicken Jalfrezi", price: "€15.00" },
        ]
      },
    ]
  },
  {
    id: "lamb",
    name: "Lamb Main Courses",
    subcategories: [
      {
        name: "Lamb Specialties",
        items: [
          { name: "Lamb Rogan Josh", price: "€16.00", popular: true, image: "https://images.unsplash.com/photo-1605709303005-0fdacbbbec70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
          { name: "Lamb Korma", price: "€16.00" },
          { name: "Lamb Vindaloo", price: "€16.00" },
          { name: "Lamb Madras", price: "€16.00" },
          { name: "Lamb Biryani", price: "€17.00", popular: true },
        ]
      },
    ]
  },
  {
    id: "vegetable",
    name: "Vegetable Main Courses",
    subcategories: [
      {
        name: "Vegetarian Specialties",
        items: [
          { name: "Paneer Butter Masala", price: "€13.00", popular: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
          { name: "Palak Paneer", price: "€13.00", popular: true },
          { name: "Chana Masala", price: "€12.00" },
          { name: "Dal Makhani", price: "€12.00" },
          { name: "Aloo Gobi", price: "€12.00" },
          { name: "Baingan Bharta", price: "€13.00" },
        ]
      },
    ]
  },
  {
    id: "fish",
    name: "Fish & Seafood",
    subcategories: [
      {
        name: "Seafood Specialties",
        items: [
          { name: "Prawn Curry", price: "€17.00", popular: true, image: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
          { name: "Fish Curry", price: "€16.00" },
          { name: "Prawn Masala", price: "€17.00" },
          { name: "Goan Fish Curry", price: "€16.00", popular: true },
        ]
      },
    ]
  },
  {
    id: "rice",
    name: "Rice Specialties",
    subcategories: [
      {
        name: "Rice Dishes",
        items: [
          { name: "Vegetable Biryani", price: "€14.00", popular: true },
          { name: "Chicken Biryani", price: "€15.00", popular: true, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
          { name: "Lamb Biryani", price: "€16.00" },
          { name: "Prawn Biryani", price: "€17.00" },
          { name: "Jeera Rice", price: "€5.00" },
          { name: "Steamed Basmati Rice", price: "€4.00" },
        ]
      },
    ]
  },
  {
    id: "traditional",
    name: "Traditional Specialties",
    subcategories: [
      {
        name: "Chef's Specialties",
        items: [
          { name: "Thali (Vegetarian)", price: "€18.00", popular: true },
          { name: "Thali (Non-Vegetarian)", price: "€20.00", popular: true },
          { name: "Kofta Curry", price: "€14.00" },
          { name: "Dhaba Style Curry", price: "€15.00" },
        ]
      },
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    subcategories: [
      {
        name: "Sweet Endings",
        items: [
          { name: "Gulab Jamun", price: "€6.00", popular: true, image: "https://images.unsplash.com/photo-1619110742272-6620db3115e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
          { name: "Rasmalai", price: "€6.00", popular: true },
          { name: "Kulfi", price: "€5.00" },
          { name: "Halwa", price: "€5.00" },
          { name: "Kheer", price: "€5.00" },
          { name: "Sorbet", price: "€5.00" },
        ]
      },
    ]
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
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

    const elements = menuRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Filter menu items based on search term
  const filteredMenu = searchTerm
    ? menuCategories.map((category) => ({
        ...category,
        subcategories: category.subcategories
          .map((subcategory) => ({
            ...subcategory,
            items: subcategory.items.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
          }))
          .filter((subcategory) => subcategory.items.length > 0),
      })).filter((category) => category.subcategories.length > 0)
    : menuCategories;

  return (
    <section
      id="menu"
      ref={menuRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="taj-heading text-3xl md:text-4xl mb-6 animate-on-scroll opacity-0" style={{ transitionDelay: "0.1s" }}>
            Our Menu
          </h2>
          <p className="text-gray-700 mb-8 animate-on-scroll opacity-0" style={{ transitionDelay: "0.2s" }}>
            Explore our carefully crafted menu of authentic Indian cuisine made with the finest ingredients and traditional recipes.
          </p>
          
          <div className="relative max-w-md mx-auto mb-10 animate-on-scroll opacity-0" style={{ transitionDelay: "0.3s" }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search our menu..."
              className="pl-10 bg-gray-50 border-taj-gold focus:ring-taj-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Menu Categories Tabs */}
        <Tabs 
          defaultValue={menuCategories[0].id} 
          className="animate-on-scroll opacity-0"
          style={{ transitionDelay: "0.4s" }}
          onValueChange={(value) => setActiveCategory(value)}
        >
          <div className="overflow-x-auto pb-4 mb-6">
            <TabsList className="bg-gray-100 p-1 inline-flex whitespace-nowrap min-w-max">
              {filteredMenu.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`px-4 py-2 rounded-md transition-all ${
                    activeCategory === category.id
                      ? "bg-taj-maroon text-white shadow-md"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {filteredMenu.map((category) => (
            <TabsContent key={category.id} value={category.id} className="animate-fade-up">
              {category.subcategories.map((subcategory, index) => (
                <div key={subcategory.name} className="mb-12">
                  <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">
                    {subcategory.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategory.items.map((item) => (
                      <div
                        key={item.name}
                        className={`taj-card group transition-all duration-300 ${
                          item.popular ? "menu-item-highlight" : ""
                        }`}
                      >
                        {item.image && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold">{item.name}</h4>
                            <span className="text-taj-maroon font-medium">
                              {item.price}
                            </span>
                          </div>
                          {item.quantity && (
                            <p className="text-sm text-gray-500 mb-2">
                              {item.quantity}
                            </p>
                          )}
                          {item.popular && (
                            <div className="mt-2">
                              <span className="bg-taj-gold text-taj-maroon text-xs font-semibold px-2 py-1 rounded-full">
                                Popular
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {searchTerm && filteredMenu.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No menu items found. Try a different search term.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button className="taj-button animate-on-scroll opacity-0" style={{ transitionDelay: "0.6s" }}>
            Download Full Menu
          </Button>
        </div>
      </div>
      
      <div className="absolute top-20 -right-20 w-60 h-60 bg-taj-gold/20 rounded-full blur-[60px]"></div>
      <div className="absolute bottom-40 -left-20 w-80 h-80 bg-taj-maroon/10 rounded-full blur-[80px]"></div>
    </section>
  );
}
