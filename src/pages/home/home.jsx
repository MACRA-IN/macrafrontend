import React from "react";
import Header from "../../components/home/header";
import Hero from "../../components/home/hero";
import MenuSection from "../../components/home/menuSection";
import ScienceSection from "../../components/home/scienceSection";
import TrialSection from "../../components/home/trailSection";
import FinalCTA from "../../components/home/finalCTA";
import Footer from "../../components/home/footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <MenuSection />
      <ScienceSection />
      <TrialSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};
export default Home;
