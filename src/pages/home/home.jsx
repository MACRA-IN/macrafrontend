import React from "react";
import SEO from "../../components/common/SEO";
import Header from "../../components/home/header";
import Hero from "../../components/home/hero";
import HowItWorks from "../../components/home/howItWorks";
import TiersPreview from "../../components/home/tiersPreview";
import PlansSection from "../../components/home/planSection";
import ScienceCTA from "../../components/home/scienceCTA";
import FinalCTA from "../../components/home/finalCTA";
import Footer from "../../components/home/footer";

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "FoodEstablishment"],
      "@id": "https://macra.in/#business",
      "name": "Macra",
      "description": "Subscription-based high-protein meal bowl delivery service in Hyderabad",
      "url": "https://macra.in",
      "telephone": "+918309180145",
      "email": "nanduboda13@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "KPHB Colony",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500085",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.4875,
        "longitude": 78.3953
      },
      "priceRange": "₹149-₹249",
      "servesCuisine": ["Healthy", "High Protein", "Indian"],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 17.4875,
          "longitude": 78.3953
        },
        "geoRadius": "3000"
      },
      "sameAs": ["https://www.instagram.com/macra.in"]
    },
    {
      "@type": "WebSite",
      "@id": "https://macra.in/#website",
      "url": "https://macra.in",
      "name": "Macra",
      "description": "Macro-tracked protein bowls delivered daily in Hyderabad"
    }
  ]
};

const Home = () => (
  <div className="bg-bg">
    <SEO
      title="Macra — High Protein Bowls Delivered Daily in Hyderabad"
      description="Subscribe to macro-tracked protein bowls delivered fresh to your door in Hyderabad. Pick a tier, plan your week, get lunch and dinner daily. Starting at ₹149/bowl."
      keywords="protein bowls Hyderabad, healthy meal delivery Hyderabad, macro meals, meal subscription Hyderabad, protein bowl delivery KPHB, healthy food delivery, fitness meals Hyderabad, diet food delivery Hyderabad, high protein meals"
      canonicalPath="/"
      structuredData={businessSchema}
    />
    <Header />
    <Hero />
    <HowItWorks />
    <TiersPreview />
    <PlansSection />
    <ScienceCTA />
    <FinalCTA />
    <Footer />
  </div>
);

export default Home;
