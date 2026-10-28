import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  DoorOpen,
  Leaf,
  MoveUpRight,
  Sprout,
  Users,
} from "lucide-react";
import { ProfileGuide } from "@/components/profile-guide";
import { contact, projects } from "@/lib/profile";

function CourtyardMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="33"
      height="37"
      viewBox="0 0 40 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 38V20a14 14 0 0 1 28 0v18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M20 38V22c0-7 4-11 10-12 1 7-3 12-10 12Z" fill="currentColor" />
      <path d="M20 29c-7 0-10-4-10-9 6 0 10 3 10 9Z" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const featured = projects[0];
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header wrap">
        <a href="#home" className="brand" aria-label="Laura Anthony, home">
          <CourtyardMark />
          <span>Laura Anthony</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">My work</a>
          <a href="#about">About me</a>
          <a href="#contact" className="nav-contact">
            Let’s talk
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main id="main">
        <section id="home" className="hero wrap" aria-labelledby="welcome">
          <div className="hero-content">
            <h1 id="welcome">
              Hi, I’m Laura.
              <br />I build with
              <br />
              <span>people in mind.</span>
            </h1>
            <p className="hero-intro">
              I’m an engineer building private AI systems and native apps on
              Apple platforms.
            </p>
            <a href="#work" className="text-link hero-link">
              Explore my work
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <ProfileGuide
              aiAvailable={Boolean(process.env.ANTHROPIC_API_KEY)}
            />
          </div>
          <figure className="courtyard-figure">
            <div className="courtyard-photo">
              <Image
                src="/images/courtyard.jpg"
                alt="An open wooden doorway in a warm brick wall, leading into a sunlit courtyard filled with plants and terracotta steps."
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1200px) 42vw, 530px"
                className="object-cover"
              />
              <span className="photo-note">
                <DoorOpen size={17} aria-hidden="true" />
                Come on in.
              </span>
            </div>
            <figcaption>
              <span className="photo-credit">
                Photo by{" "}
                <a
                  href="https://unsplash.com/photos/green-plant-on-white-pot-bJI6wdahhYs"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mick Haupt
                </a>
              </span>
            </figcaption>
          </figure>
        </section>

        <div className="welcome-divider wrap" aria-hidden="true">
          <Sprout size={22} strokeWidth={1.4} aria-hidden="true" />
        </div>

        <section
          id="work"
          className="work-section wrap section-space"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="work-title">Selected work</h2>
            </div>
          </div>

          <article
            id="classroom-ai"
            className="featured-project"
            aria-labelledby="classroom-title"
          >
            <div className="featured-copy">
              <p className="project-kicker">
                <span className="status-dot" />
                {featured.status}
              </p>
              <h3 id="classroom-title">Classroom AI</h3>
              <p className="featured-lede">Private AI for schools.</p>
              <p>{featured.summary}</p>
              <div className="project-tools" aria-label="Technologies">
                {featured.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <details className="project-detail">
                <summary>
                  Inside the build
                  <ArrowRight size={16} aria-hidden="true" />
                </summary>
                <p>{featured.description}</p>
                <p>{featured.detail}</p>
              </details>
            </div>
            <div
              className="classroom-visual"
              role="img"
              aria-label="Classroom AI architecture: students, teachers, and staff connect through a native app to open models on a school-owned Mac."
            >
              <div className="architecture-caption">
                <Leaf size={15} aria-hidden="true" />
                How Classroom AI works
              </div>
              <div className="system-people">
                <span>Students</span>
                <span>Teachers</span>
                <span>Staff</span>
              </div>
              <div className="system-line" />
              <div className="system-app">
                <Code2 size={22} strokeWidth={1.6} aria-hidden="true" />
                <span>Native app</span>
              </div>
              <div className="system-line" />
              <div className="system-mac">
                <div className="mac-arch">
                  <Sprout size={28} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <strong>School-owned Mac</strong>
                <span>Open models · MLX</span>
                <span className="system-control">
                  <Check size={12} aria-hidden="true" />
                  Runs locally
                </span>
              </div>
            </div>
          </article>

          <div className="project-list">
            {projects.slice(1).map((project, i) => (
              <details className="project-row" key={project.id} id={project.id}>
                <summary>
                  <span className="project-number">0{i + 2}</span>
                  <span className="project-row-main">
                    <span className="project-category">{project.category}</span>
                    <h3>{project.name}</h3>
                    <span className="project-row-summary">
                      {project.summary}
                    </span>
                  </span>
                  <span className="project-status">{project.status}</span>
                  <span className="project-open" aria-hidden="true">
                    <span />
                  </span>
                </summary>
                <div className="project-expanded">
                  <p>{project.description}</p>
                  <div className="project-tools">
                    {project.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          id="approach"
          className="approach-section"
          aria-labelledby="approach-title"
        >
          <div className="wrap section-space">
            <div className="section-heading">
              <div>
                <h2 id="approach-title">How I build</h2>
              </div>
            </div>
            <div className="principles">
              <article>
                <Leaf size={27} strokeWidth={1.4} aria-hidden="true" />
                <h3>Privacy, from the start.</h3>
                <p>
                  Choose where data lives and who controls it before choosing a
                  model.
                </p>
              </article>
              <article>
                <Code2 size={27} strokeWidth={1.4} aria-hidden="true" />
                <h3>Test the claim.</h3>
                <p>
                  If a model writes better code, I check whether it compiles.
                </p>
              </article>
              <article>
                <Users size={27} strokeWidth={1.4} aria-hidden="true" />
                <h3>Start with people.</h3>
                <p>
                  My education background keeps the focus on how people learn
                  and work.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="about-section wrap section-space"
          aria-labelledby="about-title"
        >
          <figure className="portrait-figure">
            <div className="portrait-photo">
              <Image
                src="/images/laura.jpg"
                alt="Laura Anthony standing beside a table and a plant in a bright workspace."
                fill
                sizes="(max-width: 767px) calc(100vw - 64px), 360px"
                className="object-cover"
              />
            </div>
          </figure>
          <div className="about-copy">
            <h2 id="about-title">A little about me.</h2>
            <p>
              I’ve been an educator, an engineering leader, and a co-founder.
              Today, I work at Apple.
            </p>
            <p>
              That path taught me to connect technical depth with what people
              actually need.
            </p>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              LinkedIn
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          id="background"
          className="background-section wrap"
          aria-labelledby="background-title"
        >
          <div className="background-heading">
            <p className="eyebrow">Experience</p>
            <h2 id="background-title" className="sr-only">
              Professional background
            </h2>
          </div>
          <div className="background-list">
            <article>
              <span className="chapter-dot" />
              <h3>Apple</h3>
              <p>
                Engineering, education technology, and enterprise deployment.
              </p>
            </article>
            <article>
              <span className="chapter-dot" />
              <h3>LaunchFrame</h3>
              <p>
                Co-founded a technology consultancy and grew its engineering
                team.
              </p>
            </article>
            <article>
              <span className="chapter-dot" />
              <h3>The Westminster Schools</h3>
              <p>Led a 14-person technology and engineering team.</p>
            </article>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section wrap"
          aria-labelledby="contact-title"
        >
          <div className="contact-inner">
            <div className="contact-arch">
              <CourtyardMark />
            </div>
            <h2 id="contact-title">My door is open.</h2>
            <p>Have a project or a question? I’d love to hear it.</p>
            <a className="contact-button" href={`mailto:${contact.email}`}>
              Say hello
              <MoveUpRight size={17} aria-hidden="true" />
            </a>
            <a className="email-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <p>© {new Date().getFullYear()} Laura Anthony</p>
        <div>
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href="#home">
            Back to the top
            <ArrowRight size={12} className="-rotate-90" aria-hidden="true" />
          </a>
        </div>
        <p className="footer-privacy">
          No analytics or ad cookies. Views are my own.
        </p>
      </footer>
    </>
  );
}
