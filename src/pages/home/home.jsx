import React from "react";
import Header from "../../components/home/header";
import Hero from "../../components/home/hero";
import HowItWorks from "../../components/home/howItWorks";
import TiersPreview from "../../components/home/tiersPreview";
import PlansSection from "../../components/home/planSection";
import ScienceCTA from "../../components/home/scienceCTA";
import FinalCTA from "../../components/home/finalCTA";
import Footer from "../../components/home/footer";

const Home = () => (
  <div className="bg-bg">
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
