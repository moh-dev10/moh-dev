export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-main">
        <div className="max-w-3xl">
          <p className="font-mono text-accent">GET IN TOUCH</p>

          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-6xl">
            Have a project in mind?
            <br />
            <span className="font-serif font-normal italic">
              Let&apos;s build it.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            Whether you need a modern website, eCommerce platform,
            custom WordPress solution, or web application, let&apos;s
            talk about what you&apos;re building.
          </p>

          <a
            href="mailto:mohamedhadou820@email.com"
            className="mt-8 inline-flex items-center rounded-full bg-[var(--text-primary)] px-6 py-3 font-medium text-white! transition-transform duration-300 hover:-translate-y-1"
          >
            Start a conversation
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              EMAIL
            </p>
            <a
              href="mailto:mohamedhadou820@email.com"
              className="mt-2 inline-block hover:text-accent"
            >
              mohamedhadou820@email.com
            </a>
          </div>

          <div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              BASED IN
            </p>
            <p className="mt-2">Algeria · Available remotely</p>
          </div>

          <div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              SOCIAL
            </p>

            <div className="mt-2 flex gap-4">
              <a href="https://github.com/moh-dev10" className="hover:text-accent">
                GitHub
              </a>
              <a href="https://linkedin.com/in/moh-dev10" className="hover:text-accent">
                LinkedIn
              </a>
              <a href="https://instagram.com/mohdev10" className="hover:text-accent">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}