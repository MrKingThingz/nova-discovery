import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InstallApp } from "@/components/InstallApp";

export const metadata = {
  title: "Our Story",
  description:
    "An astronomy journal for curious people. Meet NOVA Discovery and learn how we create and review our articles.",
};
export default function AboutPage() {
  return (
    <div className="site-container page-content">
      <header className="page-heading about-heading">
        <p className="eyebrow">HELLO, FELLOW EXPLORER.</p>
        <h1>
          Curiosity is a<br />
          <em>very human thing.</em>
        </h1>
        <p>
          The universe has a way of making everyday life feel a little bigger.
          We created NOVA Discovery to share that feeling.
        </p>
      </header>
      <div className="about-grid">
        <div className="about-story">
          <h2>
            Big questions.
            <br />A place to start.
          </h2>
          <p>
            What happens inside a black hole? Could there be life beyond Earth?
            How do we see galaxies billions of years in the past?
          </p>
          <p>
            You don’t need a physics degree to ask great questions. Our articles
            make space science approachable, with context, clear explanations,
            and sources you can explore for yourself.
          </p>
          <p>
            NOVA Discovery is an independent astronomy journal created with
            NOVA, a personal AI assistant. AI helps with research and writing. A
            human reviews each article before it reaches the site.
          </p>
          <Link className="button button-primary" href="/blog">
            Find your next discovery <ArrowRight size={17} />
          </Link>
        </div>
        <section className="process-panel" id="our-process">
          <p className="eyebrow">BEHIND EVERY ARTICLE</p>
          <h2>
            From a question
            <br />
            to a clearer picture.
          </h2>
          {[
            [
              "Discover",
              "We look for interesting questions, space news, and new research.",
            ],
            [
              "Research",
              "NOVA gathers context and source material to explain the science behind the story.",
            ],
            [
              "Write",
              "The story comes together in clear, accessible language, with links to its sources.",
            ],
            [
              "Review",
              "A human reviews and approves the article before publication. AI can make mistakes; we encourage readers to explore the sources too.",
            ],
          ].map(([title, copy], i) => (
            <div className="process-step" key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
      <section className="about-install">
        <div>
          <p className="eyebrow">KEEP LOOKING UP</p>
          <h2>Make a little room for wonder.</h2>
          <p>
            Add NOVA Discovery to your phone for an easier way to keep
            exploring.
          </p>
        </div>
        <InstallApp />
      </section>
    </div>
  );
}
