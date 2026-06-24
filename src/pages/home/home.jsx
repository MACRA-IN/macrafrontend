import React from "react";
import Header from "../../components/home/header";
import Hero from "../../components/home/hero";
import MenuSection from "../../components/home/menuSection";
import ScienceSection from "../../components/home/scienceCTA";
import TrialSection from "../../components/home/trailSection";
import FinalCTA from "../../components/home/finalCTA";
import Footer from "../../components/home/footer";
import HowItWorks from "../../components/home/howItWorks";
import TiersPreview from "../../components/home/tiersPreview";
import PlansSection from "../../components/home/planSection";
import ScienceCTA from "../../components/home/scienceCTA";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <HowItWorks />
      <TiersPreview />
      <PlansSection/>
      <ScienceCTA />
      {/* <TrialSection /> */}
      <FinalCTA />
      <Footer />
    </div>
  );
};
export default Home;
