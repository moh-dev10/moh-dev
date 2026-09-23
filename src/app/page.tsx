import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import WhyHireMe from "@/components/sections/WhyHireMe";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    
    <>
    <Navbar/>
     <main>
       <Hero/>
       <Marquee/>
       <WhyHireMe/> 
       <Work/>
       <Services/>
     </main>
    </>
  );
}