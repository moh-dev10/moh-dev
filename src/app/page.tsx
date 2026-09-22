import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import WhyHireMe from "@/components/sections/WhyHireMe";

export default function Home() {
  return (
    
    <>
    <Navbar/>
     <main>
       <Hero/>
       <Marquee/>
       <WhyHireMe/>
     </main>
    </>
  );
}