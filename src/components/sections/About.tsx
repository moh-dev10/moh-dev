        import { Check } from "lucide-react"

        import Reveal from "../ui/Reveal"
        export default function About() {

            const mindsetPrinciples = [
                {label:"Business-oriented",desc:"Every feature tied to ROI."},
                {label:"UI/UX care",desc:"Clean, premium interfaces."},
                {label:"Clean, maintainable code",desc:"Built to scale & handover."},
                {label:"Always learning ",desc:"Next.js, Node, PostgreSQL."},
            ]
            return (
                <section id="about" className="py-20 md:py-28">

                    <div className="container-main flex flex-col gap-4 items-center">

                      <span className="mono-label text-accent ">About</span>

                        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14 lg:gap-16">
                         
    
                        {/* profile image */}
                            <Reveal
                             direction="left">
                                <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-[var(--border)]">
                                    <img 
                                    src="/moha.webp" 
                                    alt="Mohamed — Full-Stack Web Developer" 
                                    className="absolute inset-0 h-full w-full object-cover"
                                    />
                                </div>
                            </Reveal>
    
                            {/* content  */}
    
                           <Reveal direction="right">
                                <div className="flex flex-col justify-center gap-5">
                                    <h2 className="max-w-xl font-heading text-4xl font-bold">A developer with a <em className="font-serif text-accent">business mindset.</em></h2>
                                    <p className="max-w-2xl leading-7 text-[var(--text-secondary)]">I'm Mohamed, a young Full-Stack Web Developer based in Algeria. I'm actively growing toward full-stack engineering —
                                        while already shipping real websites and stores for real clients.</p>
                                    <p className="max-w-2xl leading-7 text-[var(--text-secondary)]">My focus isn't just writing code. It's understanding your customers, your sales process, and building a website 
                                        that actually helps: more inquiries, easier ordering, stronger credibility.</p>    
                                <div className="grid grid-cols-2 gap-4">
                                    {mindsetPrinciples.map((p) => (
                                        <div key={p.label}
                                        className="flex items-start gap-3 bg-white border border-[var(--border)] p-4 rounded-xl">
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--dark)] text-base font-bold text-white">
                                          ✓
                                        </span>
                                        <div className="flex flex-col ">
                                            <span className="font-semibold font-heading text text-sm md:text-lg">{p.label}</span>
                                            <span className="text-xs md:text-sm text-[var(--text-secondary]">{p.desc}</span>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                                </div>
                           </Reveal>
    
    
                        
                        </div>
                    </div>

                </section>
            )
        }