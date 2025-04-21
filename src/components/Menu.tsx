
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
          { name: "Coasts of Provence", price: "€17.00", quantity: "Bottle" },
          { name: "Tavel", price: "€20.00", quantity: "Bottle" },
          { name: "Indian Grover", price: "€24.00", quantity: "Bottle" },
          { name: "Bandol", price: "€27.00", quantity: "Bottle" },
        ]
      },
      {
        name: "Red Wines",
        items: [
          { name: "Gamay from Tourraine", price: "€18.00", quantity: "Bottle" },
          { name: "Saumur champigny", price: "€22.00", quantity: "Bottle" },
          { name: "Saint Nicholas of Burgundy", price: "€18.00", quantity: "Bottle" },
          { name: "Saint Emilion", price: "€26.00", quantity: "Bottle" },
          { name: "Brouilly", price: "€22.00", quantity: "Bottle" },
          { name: "Pinot noit from alsace", price: "€18.00", quantity: "Bottle" },
          { name: "Indian Grover", price: "€24.00", quantity: "Bottle" },
        ]
      },
      {
        name: "White Wines",
        items: [
          { name: "Muscadet on the lees AOC", price: "€17.00", quantity: "Bottle" },
          { name: "Riesling AOP", price: "€18.00", quantity: "Bottle" },
        ]
      },
      {
        name: "Wines by the Pitcher",
        items: [
          { name: "Red-Pink-White European", price: "€9.00", quantity: "50cl" },
        ]
      },
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    subcategories: [
      {
        name: "Appetizers Drinks",
        items: [
          { name: "Kir", price: "€6.00", quantity: "10cl", popular: true },
          { name: "Kir Royal", price: "€7.50", quantity: "10cl", popular: true },
          { name: "Champage Cutting", price: "€10.00", quantity: "10cl", popular: true },
          { name: "Americano", price: "€5.00", quantity: "6cl", popular: true },
          { name: "Whisky", price: "€7.00", quantity: "4cl", popular: true },
          { name: "Whisky baby", price: "€4.00", quantity: "2cl", popular: true },
          { name: "Martini", price: "€6.00", quantity: "2cl" },
          { name: "Ricard", price: "€6.00", quantity: "2cl" },
          { name: "Pastis", price: "€6.00", quantity: "2cl" },
          { name: "Gin", price: "€4.00", quantity: "2cl" },
          { name: "Vodka", price: "€4.00", quantity: "2cl" },
          { name: "House cocktail", price: "€7.00", quantity: "10cl" },
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
          { name: "Plain, sweet or savoury lassi", price: "€6.00", quantity: "30cl", popular: true },
          { name: "Banana rose gold lassi", price: "€6.00", quantity: "30cl" },
          { name: "Mango Lassi", price: "€6.00", quantity: "30cl", popular: true },
        ]
      },
    ]
  },
  {
    id: "beers",
    name: "Beers",
    subcategories: [
      {
        name: "Beers",
        items: [
          { name: "Kingfisher Indian Beer", price: "€6.00", quantity: "25cl", popular: true },
          { name: "Leffe", price: "€5.00", quantity: "25cl", popular: true },
          { name: "Hieneken", price: "€5.00", quantity: "25cl" },
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
          { name: "Vittel", price: "€6.00", quantity: "100cl" },
          { name: "San Pellegrino", price: "€6.00", quantity: "100cl" },
          { name: "Coca Cola or Diet or Zero", price: "€3.00", quantity: "100cl" },
          { name: "Perrier", price: "€3.00", quantity: "100cl" },
          { name: "Orangina", price: "€3.00", quantity: "100cl" },
          { name: "Diablo", price: "€2.50", quantity: "100cl" },
          { name: "Pineapple juice", price: "€3.00", quantity: "100cl" },
          { name: "Orange juice", price: "€3.00", quantity: "100cl" },
          { name: "Apricot juice", price: "€3.00", quantity: "100cl" },
          { name: "Water syrup(grenadine, strawberry, mint, lemon)", price: "€2.00", quantity: "100cl" },
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
          { name: "Coffee", price: "€2.00", quantity: "1 cup", popular: true },
          { name: "Natural tea or, with mint, verbena or linden infusion", price: "€3.00", quantity: "1 cup" },
          { name: "Homemade cardamom tea", price: "€3.00", quantity: "1 cup", popular: true },
          { name: "Punjab Milk Tea", price: "€4.00", quantity: "1 cup", popular: true },
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
          { name: "Plain Naan", price: "€4.00", popular: true },
          { name: "Chapati", price: "€5.00", popular: true },
          { name: "Paratha", price: "€5.00" },
          { name: "NAM Cheese", price: "€5.00" },
          { name: "Garlic Naan", price: "€5.00" },
          { name: "Garlic cheese", price: "€6.00" },
          { name: "Chicken Tikka Naan", price: "€5.00" },
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
          { name: "Sheekh Kabab", price: "€7.00", popular: true },
          { name: "Tandoori Chicken", price: "€8.00", popular: true },
          { name: "Fish Tikka", price: "€8.00" },
          { name: "Chicken Tikka", price: "€7.00" },
          { name: "Lamb Tikka", price: "€8.00" },
          { name: "Tandoori prawns", price: "€16.00" },
          { name: "Shahi Mix Grill (for 2 people)", price: "€22.00" },
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
          { name: "Samosa", price: "€7.00", popular: true },
          { name: "Dall Soup", price: "€7.00", popular: true },
          { name: "Raita", price: "€5.00" },
          { name: "Pakora", price: "€5.00" },
          { name: "Baigan Bajia", price: "€5.00" },
          { name: "Ginga Pakora", price: "€7.00" },
          { name: "Baja Onion", price: "€6.00" },
          { name: "Chicken pakora", price: "€7.00" },
          { name: "Shahi mix pakora (for 1 people)", price: "€8.00" },
          { name: "Shahi mix pakora (for 2 people)", price: "€15.00" },
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
          { name: "Chicken Curry", price: "€15.00", popular: true },
          { name: "Chicken Madras", price: "€15.00", popular: true },
          { name: "Chicken Vindaloo", price: "€15.00" },
          { name: "Chicken tikka masala", price: "€15.00" },
          { name: "Chicken with vegetables", price: "€15.00" },
          { name: "Chicken shahi korma", price: "€15.00" },
          { name: "Eggplant Chicken", price: "€15.00" },
          { name: "Butter chicken", price: "€15.00" },
          { name: "Chicken sag", price: "€15.00" },
          { name: "Chicken Dall", price: "€15.00" },
          { name: "Mushroom chicken", price: "€15.00" },
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
          { name: "Palak Lamb", price: "€16.00", popular: true },
          { name: "Lamb Shahi Korma", price: "€16.00" },
          { name: "Lamb Tikka Masala", price: "€16.00" },
          { name: "Baigan Lamb", price: "€16.00" },
          { name: "Dall Ghiost", price: "€16.00", popular: true },
          { name: "Lamb Rogane Josh", price: "€16.00", popular: true },
          { name: "Lamb Mushroom Masala", price: "€16.00", popular: true },
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
          { name: "Dall House", price: "€14.00", popular: true }, 
          { name: "Mixed vegetables", price: "€14.00", popular: true },
          { name: "Bharta", price: "€14.00" },
          { name: "Vegetable Shahi Korma", price: "€14.00" },
          { name: "Aloo Palak", price: "€14.00" },
          { name: "Palak Paneer", price: "€14.00" },
          { name: "Masala Mushrooms", price: "€14.00" },
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
          { name: "Shrimp Curry", price: "€16.00", popular: true },
          { name: "Shrimp Shahi korma", price: "€16.00" },
          { name: "Sag Shrimp", price: "€16.00" },
          { name: "Eggplant Shrimp", price: "€18.00", popular: true },
          { name: "Royal Prawns", price: "€18.00", popular: true },
          { name: "Bangal Fish", price: "€16.00", popular: true },
          { name: "Curry Fish", price: "€16.00", popular: true },
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
          { name: "Vegetable Biryani", price: "€15.00", popular: true },
          { name: "Chicken Biryani", price: "€16.00", popular: true },
          { name: "Lamb Biryani", price: "€16.00" },
          { name: "Shrimp Biryani", price: "€16.00" },
          { name: "Shahi Biryani", price: "€17.00" },
          { name: "Basmati rice", price: "€5.00" },
          { name: "Matar pulao", price: "€6.00" },
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
          { name: "Gulab Jamun", price: "€4.00", popular: true },
          { name: "Suji halwa", price: "€4.00", popular: true },
          { name: "Sherbet", price: "€4.00" },
          { name: "Kulfi - Indian Ice Cream", price: "€5.50" },
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
