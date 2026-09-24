"use client";

import { useState ,useEffect} from "react";

import { AnimatePresence,motion } from "framer-motion";

import { navLinks } from "@/data/navLinks";
import { ArrowRight } from "lucide-react";


export default function MobileMenu() {

    const [isMenuOpen,setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <div className="md:hidden">
           <button 
           type="button"
           aria-label={isMenuOpen? "Close Menu" : "Open Menu"}
           aria-expanded={isMenuOpen}
           onClick={() => setIsMenuOpen((prev) => !prev)}
           className="group flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] transition-colors duration-200 hover:border-accent md:hidden">

            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                animate = {{
                    d : isMenuOpen?"M6 5L19 19":"M6 7H20"
                }
                }
                transition={{
                    duration:0.3,
                    ease:"easeInOut",
                }}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                <motion.path
                animate={{
                    
                    d:isMenuOpen?"M6 19L19 5":"M9 12H19",
                }}
                 transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                 }}
            
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                <motion.path
                    d="M8 17H20"
                animate={{
                     opacity: isMenuOpen? 0 : 1,
                }}

                transition={{
                    duration:0.2,
                    
                }}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                
              </svg>
           </button>
           <AnimatePresence>
               {isMenuOpen && (
                   <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute left-0 right-0 top-full min-h-[calc(100vh-4rem)] border-b border-[var(--border)] bg-[var(--background)]">
                        <div className="flex flex-col gap-4 pt-20 px-10">
                            {navLinks.map((link,index) => (
                              <motion.div 
                              key={link.href}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.25,
                                delay: index * 0.06,
                                ease: "easeOut",
                              }}
                              className="pb-4 border-b border-[var(--border)]">
                                  <motion.a 
                                  whileHover={{x: 6}}
                                  whileTap={{x: 3}}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  href={link.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center justify-between font-heading text-2xl font-extrabold">
                                    {link.title}
                                  <span className="font-mono text-xs text-[var(--text-secondary)]">
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  </motion.a> 
                              </motion.div>
                            ))}

                            <motion.a
                                href="/contact"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97, y: 0 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeOut",
                                }}
                                className="group flex items-center justify-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--accent)] px-5 py-3 text-md font-bold !text-white"
                              >
                                Let&apos;s work together
                                <ArrowRight
                                  size={16}
                                  className="transition-transform duration-300 group-hover:-rotate-45"
                                />
                              </motion.a>
                        </div>
                   </motion.div>
               )}
           </AnimatePresence>
        </div>
    );  
}