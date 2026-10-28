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
          <span>
            Laura Anthony
            <span className="brand-caption">
              Engineer. Builder. Curious human.
            </span>
          </span>
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
            <p className="eyebrow">
              <span className="little-dot" />A little space for thoughtful
              technology
            </p>
            <h1 id="welcome">
              Hi, I’m Laura.
              <br />I build with
              <br />
              <span>people in mind.</span>
            </h1>
            <p className="hero-intro">
              I’m an engineer, a builder, and an endlessly curious human. I turn
              emerging technology into things people can actually use.
            </p>
            <p className="hero-focus">
              These days, that means private AI, native apps, and a lot of
              learning by doing.
            </p>
            <a href="#work" className="text-link hero-link">
              Come see what I’m working on
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
                The door’s open. Come on in.
              </span>
            </div>
            <figcaption>
              A quieter corner of the internet.
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

        <div className="welcome-divider wrap">
          <span>Thoughtful systems. Real people. Room to grow.</span>
          <Sprout size={22} strokeWidth={1.4} aria-hidden="true" />
        </div>

        <section
          id="work"
          className="work-section wrap section-space"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">A few things I’m putting into the world</p>
              <h2 id="work-title">
                Built with care.
                <br />
                <span className="muted-heading">Always in progress.</span>
              </h2>
            </div>
            <p>
              I like the space between “what if” and “it works.” Here are a few
              things I’ve been building, exploring, and helping grow.
            </p>
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
              <p className="featured-lede">
                Useful AI.
                <br />
                Closer to the classroom.
              </p>
              <p>{featured.summary}</p>
              <p>{featured.description}</p>
              <div className="project-tools" aria-label="Technologies">
                {featured.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <details className="project-detail">
                <summary>
                  A little more about this project
                  <ArrowRight size={16} aria-hidden="true" />
                </summary>
                <p>{featured.detail}</p>
              </details>
            </div>
            <div
              className="classroom-visual"
              role="img"
              aria-label="Architecture sketch: students, teachers, and staff connect through a native app to open models on a school-owned Mac."
            >
              <div className="architecture-caption">
                <Leaf size={15} aria-hidden="true" />
                An idea I’m exploring
              </div>
              <div className="system-people">
                <span>Students</span>
                <span>Teachers</span>
                <span>Staff</span>
              </div>
              <div className="system-line" />
              <div className="system-app">
                <Code2 size={22} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  A native app<span>A familiar place to learn & work</span>
                </span>
              </div>
              <div className="system-line" />
              <div className="system-mac">
                <div className="mac-arch">
                  <Sprout size={28} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <strong>Your school’s Mac</strong>
                <span>Open models · MLX inference</span>
                <span className="system-control">
                  <Check size={12} aria-hidden="true" />
                  School-owned infrastructure
                </span>
              </div>
              <p className="architecture-footnote">
                A system sketch, from a working prototype.
              </p>
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
                <p className="eyebrow">The way I work</p>
                <h2 id="approach-title">
                  Good technology
                  <br />
                  starts with care.
                </h2>
              </div>
              <p>
                I care about the engineering behind a product as much as the
                experience of the person using it.
              </p>
            </div>
            <div className="principles">
              <article>
                <Leaf size={27} strokeWidth={1.4} aria-hidden="true" />
                <h3>Privacy, from the start.</h3>
                <p>
                  Where data lives and who controls it are architecture
                  decisions. I’m interested in systems that give people and
                  organizations more control.
                </p>
              </article>
              <article>
                <Code2 size={27} strokeWidth={1.4} aria-hidden="true" />
                <h3>Build it. Then test it.</h3>
                <p>
                  A working prototype teaches me more than a perfect slide. And
                  if a model writes better code, I want to see whether that code
                  compiles.
                </p>
              </article>
              <article>
                <Users size={27} strokeWidth={1.4} aria-hidden="true" />
                <h3>Keep the person in view.</h3>
                <p>
                  My background in education stays with me. Technology should
                  respect how people think, learn, and work, and make complexity
                  a little easier.
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
            <figcaption>
              <CourtyardMark className="portrait-mark" />
              Builder, learner, person behind the projects.
            </figcaption>
          </figure>
          <div className="about-copy">
            <p className="eyebrow">A little about me</p>
            <h2 id="about-title">
              A winding path.
              <br />
              <span className="muted-heading">
                A pretty clear through-line.
              </span>
            </h2>
            <p>
              I’ve been an educator, an engineering manager, a company
              co-founder, and a hands-on engineer. Each chapter changed how I
              think about building things.
            </p>
            <p>
              Today, I work at Apple, and I spend time exploring local AI,
              native applications, and the systems that make emerging technology
              useful in the real world.
            </p>
            <p>
              I like connecting the pieces: understanding the technology, making
              something work, and figuring out what the person on the other side
              actually needs.
            </p>
            <p className="about-signoff">
              Technical depth. Human understanding.
              <br />A healthy amount of curiosity.
            </p>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Find me on LinkedIn
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
            <p className="eyebrow">The chapters along the way</p>
            <h2 id="background-title" className="sr-only">
              Professional background
            </h2>
          </div>
          <div className="background-list">
            <article>
              <span className="chapter-dot" />
              <h3>Apple</h3>
              <p>
                Engineering, enterprise deployment, and education technology.
                Connecting technical depth with the needs of real institutions.
              </p>
            </article>
            <article>
              <span className="chapter-dot" />
              <h3>LaunchFrame</h3>
              <p>
                Co-founding a technology consultancy. Learning how to build a
                business, grow engineers, and care for the people we served.
              </p>
            </article>
            <article>
              <span className="chapter-dot" />
              <h3>The Westminster Schools</h3>
              <p>
                Leading a 14-person technology and engineering team. Working
                close to the everyday needs of educators and students.
              </p>
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
            <p className="eyebrow">
              Good things often start with a conversation
            </p>
            <h2 id="contact-title">
              Have a good question?
              <br />
              My door is open.
            </h2>
            <p>
              About a project, a possibility, or something you’re figuring out.
              <br className="hidden sm:block" /> I’d love to hear what’s on your
              mind.
            </p>
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
        <p>
          © {new Date().getFullYear()} Laura Anthony
          <span>Made with care. Still growing.</span>
        </p>
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
          No analytics or advertising cookies. Default questions stay in your
          browser.
          <br />
          This personal site reflects my own work and views.
        </p>
      </footer>
    </>
  );
}
