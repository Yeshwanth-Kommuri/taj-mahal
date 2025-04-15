
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = {
  code: string;
  name: string;
  flag: string;
};

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Define our translations
const translations: Translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.menu": "Menu",
    "nav.specials": "Specials",
    "nav.contact": "Contact",
    "nav.reserve": "Reserve Table",
    
    // Buttons
    "button.reserve": "Reserve Table",
    "button.download": "Download Menu",
    
    // Contact form
    "contact.title": "Contact Us",
    "contact.subtitle": "We look forward to serving you at Taj Mahal. Make a reservation or stop by for a culinary adventure.",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.hours": "Hours",
    "contact.reservation": "Make a Reservation",
    "contact.name": "Your Name",
    "contact.emailAddress": "Email Address",
    "contact.phoneNumber": "Phone Number",
    "contact.dateTime": "Date & Time",
    "contact.guests": "Number of Guests",
    "contact.requests": "Special Requests",
    "contact.submit": "Make Reservation",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.menu": "Menu",
    "nav.specials": "Spécialités",
    "nav.contact": "Contact",
    "nav.reserve": "Réserver une table",
    
    // Buttons
    "button.reserve": "Réserver une table",
    "button.download": "Télécharger le menu",
    
    // Contact form
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Nous sommes impatients de vous servir au Taj Mahal. Faites une réservation ou passez pour une aventure culinaire.",
    "contact.address": "Adresse",
    "contact.phone": "Téléphone",
    "contact.email": "Email",
    "contact.hours": "Heures d'ouverture",
    "contact.reservation": "Faire une réservation",
    "contact.name": "Votre nom",
    "contact.emailAddress": "Adresse email",
    "contact.phoneNumber": "Numéro de téléphone",
    "contact.dateTime": "Date et heure",
    "contact.guests": "Nombre d'invités",
    "contact.requests": "Demandes spéciales",
    "contact.submit": "Faire une réservation",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.menu": "Speisekarte",
    "nav.specials": "Spezialitäten",
    "nav.contact": "Kontakt",
    "nav.reserve": "Tisch reservieren",
    
    // Buttons
    "button.reserve": "Tisch reservieren",
    "button.download": "Speisekarte herunterladen",
    
    // Contact form
    "contact.title": "Kontaktieren Sie uns",
    "contact.subtitle": "Wir freuen uns darauf, Sie im Taj Mahal zu bedienen. Machen Sie eine Reservierung oder kommen Sie für ein kulinarisches Abenteuer vorbei.",
    "contact.address": "Adresse",
    "contact.phone": "Telefon",
    "contact.email": "E-Mail",
    "contact.hours": "Öffnungszeiten",
    "contact.reservation": "Reservierung vornehmen",
    "contact.name": "Ihr Name",
    "contact.emailAddress": "E-Mail-Adresse",
    "contact.phoneNumber": "Telefonnummer",
    "contact.dateTime": "Datum und Uhrzeit",
    "contact.guests": "Anzahl der Gäste",
    "contact.requests": "Besondere Wünsche",
    "contact.submit": "Reservierung vornehmen",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.menu": "Menú",
    "nav.specials": "Especialidades",
    "nav.contact": "Contacto",
    "nav.reserve": "Reservar mesa",
    
    // Buttons
    "button.reserve": "Reservar mesa",
    "button.download": "Descargar menú",
    
    // Contact form
    "contact.title": "Contáctenos",
    "contact.subtitle": "Esperamos servirle en Taj Mahal. Haga una reserva o pase por una aventura culinaria.",
    "contact.address": "Dirección",
    "contact.phone": "Teléfono",
    "contact.email": "Correo electrónico",
    "contact.hours": "Horario",
    "contact.reservation": "Hacer una reserva",
    "contact.name": "Su nombre",
    "contact.emailAddress": "Correo electrónico",
    "contact.phoneNumber": "Número de teléfono",
    "contact.dateTime": "Fecha y hora",
    "contact.guests": "Número de invitados",
    "contact.requests": "Peticiones especiales",
    "contact.submit": "Hacer reserva",
  },
};

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  t: (key: string) => string;
  languages: Language[];
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);

  useEffect(() => {
    // Auto-detect browser language
    const browserLang = navigator.language.split("-")[0];
    const detectedLang = languages.find((lang) => lang.code === browserLang);
    if (detectedLang) {
      setCurrentLang(detectedLang);
    }
    
    // Set the lang attribute on the html element
    document.documentElement.lang = currentLang.code;
  }, []);
  
  // Update lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = currentLang.code;
  }, [currentLang]);

  // Translation function
  const t = (key: string): string => {
    if (translations[currentLang.code] && translations[currentLang.code][key]) {
      return translations[currentLang.code][key];
    }
    // Fallback to English
    if (translations.en[key]) {
      return translations.en[key];
    }
    // Return the key if translation is not found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
