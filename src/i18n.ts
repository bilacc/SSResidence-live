import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "hero.title": "Luxury Living in the Heart of the City",
            "hero.subtitle": "Experience the pinnacle of modern design and comfort.",
            "hero.cta": "View Apartments",
            "nav.home": "Home",
            "nav.apartments": "Apartments",
            "nav.features": "Features",
            "nav.contact": "Contact",
            "features.title": "Premium Amenities",
            "contact.title": "Get in Touch",
            "footer.rights": "All rights reserved.",
        }
    },
    hr: {
        translation: {
            "hero.title": "Luksuzni Život u Srcu Grada",
            "hero.subtitle": "Doživite vrhunac modernog dizajna i udobnosti.",
            "hero.cta": "Pogledajte Apartmane",
            "nav.home": "Početna",
            "nav.apartments": "Apartmani",
            "nav.features": "Značajke",
            "nav.contact": "Kontakt",
            "features.title": "Vrhunski Sadržaji",
            "contact.title": "Kontaktirajte Nas",
            "footer.rights": "Sva prava pridržana.",
        }
    },
    sv: {
        translation: {
            "hero.title": "Lyxigt Boende i Hjärtat av Staden",
            "hero.subtitle": "Upplev höjdpunkten av modern design och komfort.",
            "hero.cta": "Visa Lägenheter",
            "nav.home": "Hem",
            "nav.apartments": "Lägenheter",
            "nav.features": "Funktioner",
            "nav.contact": "Kontakt",
            "features.title": "Premium Bekvämligheter",
            "contact.title": "Kontakta Oss",
            "footer.rights": "Alla rättigheter förbehållna.",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
