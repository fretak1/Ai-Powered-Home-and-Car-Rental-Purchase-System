import Image from "react";
import HeroSection from "./(nonedashboared)/landing/HeroSection";
import DiscoverSection from "./(nonedashboared)/landing/DiscoverSection";
import CallToActionSection from "./(nonedashboared)/landing/CallToActionSection";
import FooterSection from "./(nonedashboared)/landing/FooterSection";
import FeaturesSection from "./(nonedashboared)/landing/FeaturesSection";
import Landing from "./(nonedashboared)/landing/page";
const landing = ()=>{
return(
  <div>
<HeroSection/>
<FeaturesSection/>
<DiscoverSection/>
<CallToActionSection/>
<FooterSection/>

  </div>
);

};
export default Landing;