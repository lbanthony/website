import Image from "next/image";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseVisual } from "@/components/case-visuals";
import { Intersection } from "@/components/intersection";
import { ProfileGuide } from "@/components/profile-guide";
import {
  caseStudies,
  contact,
  education,
  experience,
  glance,
  headline,
  impact,
  moreWork,
  type CaseStudy,
} from "@/lib/profile";

const resumeHref =
  contact.resume || `mailto:${contact.email}?subject=R%C3%A9sum%C3%A9%20request`;
const resumeLabel = contact.resume ? "Résumé" : "Request résumé";
const resumeExternal = Boolean(contact.resume);

function ResumeLink({ className, short = false }: { className: string; short?: boolean }) {
  return (
    <a
      href={resumeHref}
      className={className}
      {...(resumeExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {short ? "Résumé" : resumeLabel}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}

function CaseStudyBlock({
  study,
  index,
  size,
}: {
  study: CaseStudy;
  index: number;
  size: "feature" | "feature reverse" | "compact";
}) {
  return (
    <article
      id={study.id}
      className={`case case--${size.replace(" ", " case--")}`}
      aria-labelledby={`${study.id}-title`}
    >
      <header className="case-head">
        <span className="case-index" aria-hidden="true">
          0{index + 1}
        </span>
        <div className="case-meta mono">
          <span>{study.kicker}</span>
          <span className="case-status">
            <span className="status-dot" aria-hidden="true" />
            {study.status}
          </span>
        </div>
      </header>

      <div className="case-body">
        <CaseVisual type={study.visual} />
        <div className="case-copy">
          <h3 id={`${study.id}-title`}>{study.name}</h3>
          <p className="case-thesis">{study.thesis}</p>
          <dl className="case-metrics">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <dt className="metric-label">{m.label}</dt>
                <dd className="metric-value">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <dl className="case-facts">
        <div>
          <dt className="mono">The problem</dt>
          <dd>{study.problem}</dd>
        </div>
        <div>
          <dt className="mono">My role</dt>
          <dd>{study.role}</dd>
        </div>
        <div>
          <dt className="mono">What I did</dt>
          <dd>{study.work}</dd>
        </div>
        <div>
          <dt className="mono">Outcome</dt>
          <dd>{study.outcome}</dd>
        </div>
      </dl>
      <p className="case-tools mono">{study.tools.join("  ·  ")}</p>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header wrap">
        <a href="#home" className="brand" aria-label="Laura Anthony, home">
          <span className="brand-mark" aria-hidden="true" />
          Laura Anthony
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <ResumeLink className="nav-resume" short />
        </nav>
      </header>

      <main id="main">
        {/* ---------- First screen: the ten second answer ---------- */}
        <section id="home" className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow mono">
              {headline.name} · {headline.place}
            </p>
            <h1 id="hero-title">
              AI product <em>and</em> engineering leader.
            </h1>
            <p className="hero-intro">{headline.intro}</p>
            <div className="hero-actions">
              <a className="button button--solid" href={`mailto:${contact.email}`}>
                Email me
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                className="button"
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <ResumeLink className="button" />
            </div>
          </div>
          <figure className="hero-portrait">
            <div className="portrait-frame">
              <Image
                src="/images/laura.jpg"
                alt="Laura Anthony standing in a bright workspace beside a round wooden table."
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 860px) 60vw, 360px"
                className="object-cover"
              />
            </div>
          </figure>

          <ol className="glance" aria-label="At a glance">
            {glance.map((item, i) => (
              <li key={item.label}>
                <a href={item.href}>
                  <span className="glance-label mono">
                    0{i + 1} {item.label}
                  </span>
                  <span className="glance-value">{item.value}</span>
                  <ArrowDownRight size={16} className="glance-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Impact ---------- */}
        <section className="impact" aria-labelledby="impact-title">
          <div className="wrap">
            <h2 id="impact-title" className="mono impact-title">
              Impact
            </h2>
            <dl className="impact-grid">
              {impact.map((item) => (
                <div key={item.value}>
                  <dt className="impact-label">{item.label}</dt>
                  <dd className="impact-value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- Selected work ---------- */}
        <section id="work" className="work wrap section-space" aria-labelledby="work-title">
          <div className="section-head">
            <p className="mono section-kicker">Selected work</p>
            <h2 id="work-title">
              Built, led, <em>and</em> shipped.
            </h2>
            <p className="section-lead">
              Three case studies in the same format: the problem, my role, what
              I did, and what changed.
            </p>
          </div>

          <CaseStudyBlock study={caseStudies[0]} index={0} size="feature" />
          <CaseStudyBlock study={caseStudies[1]} index={1} size="feature reverse" />
          <CaseStudyBlock study={caseStudies[2]} index={2} size="compact" />

          <div className="more-work">
            <h3 className="mono more-title">More I’m building</h3>
            {moreWork.map((project) => (
              <details className="project-row" key={project.id} id={project.id}>
                <summary>
                  <span className="project-category mono">{project.category}</span>
                  <span className="project-name">{project.name}</span>
                  <span className="project-summary">{project.summary}</span>
                  <span className="project-open" aria-hidden="true" />
                </summary>
                <div className="project-expanded">
                  <p>{project.description}</p>
                  <p className="mono">
                    {project.status} · {project.tools.join(" · ")}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- The intersection ---------- */}
        <section className="overlap" aria-labelledby="overlap-title">
          <div className="wrap section-space overlap-inner">
            <div className="section-head section-head--tight">
              <p className="mono section-kicker">Why it works</p>
              <h2 id="overlap-title">
                My work lives where three disciplines meet.
              </h2>
            </div>
            <Intersection />
          </div>
        </section>

        {/* ---------- Experience ---------- */}
        <section
          id="experience"
          className="experience wrap section-space"
          aria-labelledby="experience-title"
        >
          <div className="section-head">
            <p className="mono section-kicker">Experience</p>
            <h2 id="experience-title">Ten years of leading and building.</h2>
          </div>
          <ol className="experience-list">
            {experience.map((job) => (
              <li key={job.org}>
                <div className="exp-org">
                  <h3>{job.org}</h3>
                  <p className="mono">{job.years}</p>
                </div>
                <div className="exp-role">
                  <p>{job.role}</p>
                  <p className="mono">{job.scope}</p>
                </div>
                <p className="exp-highlights">{job.highlights}</p>
              </li>
            ))}
          </ol>
          <ul className="education mono" aria-label="Education">
            {education.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {/* ---------- Approach ---------- */}
        <section id="approach" className="approach" aria-labelledby="approach-title">
          <div className="wrap section-space">
            <blockquote className="pull-quote">
              <p>
                Decide where data lives and who controls it <em>before</em>{" "}
                choosing a model.
              </p>
            </blockquote>
            <h2 id="approach-title" className="mono section-kicker">
              How I lead
            </h2>
            <ol className="principles">
              <li>
                <h3>Start with the customer’s problem.</h3>
                <p>
                  Discovery comes first. The architecture follows what people
                  actually need, not the other way around.
                </p>
              </li>
              <li>
                <h3>Prove it with a working build.</h3>
                <p>
                  I prototype early so decisions rest on something real. If a
                  model claims to write better code, I check whether it compiles.
                </p>
              </li>
              <li>
                <h3>Grow the people around me.</h3>
                <p>
                  At LaunchFrame I moved five specialists into engineering
                  roles. Today I co-chair a mentorship program for Mac admins.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="about wrap section-space" aria-labelledby="about-title">
          <figure className="about-photo">
            <Image
              src="/images/laura-at-apple-park.jpg"
              alt="Laura Anthony looking back over her shoulder outside a curved glass building."
              fill
              sizes="(max-width: 860px) calc(100vw - 40px), 520px"
              className="object-cover"
            />
          </figure>
          <div className="about-copy">
            <p className="mono section-kicker">About</p>
            <h2 id="about-title">Educator, engineering manager, co-founder.</h2>
            <p>
              I started in schools, moved into engineering leadership, and
              co-founded a company along the way. Today I work at Apple.
            </p>
            <p>
              Across all of it, the job has been the same: understand what people
              need, then lead the team and build the technology that gets them
              there.
            </p>

            <div className="guide-wrap">
              <p className="mono guide-kicker">Try something I built</p>
              <ProfileGuide aiAvailable={Boolean(process.env.ANTHROPIC_API_KEY)} />
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="wrap contact-inner">
            <p className="mono section-kicker">Contact</p>
            <h2 id="contact-title">Let’s talk.</h2>
            <p className="contact-lead">
              Have a role, a project, or a question? I’d like to hear it.
            </p>
            <ul className="contact-links">
              <li>
                <a href={`mailto:${contact.email}`}>
                  <span className="mono">Email</span>
                  <span className="contact-value">{contact.email}</span>
                  <ArrowRight size={22} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer">
                  <span className="mono">LinkedIn</span>
                  <span className="contact-value">in/lbanthony91</span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={resumeHref}
                  {...(resumeExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span className="mono">Résumé</span>
                  <span className="contact-value">{resumeLabel}</span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <p>© {new Date().getFullYear()} Laura Anthony · Atlanta, Georgia</p>
        <div>
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="#home">Back to top</a>
        </div>
        <p className="footer-privacy mono">
          No analytics or ad cookies. Views are my own.
        </p>
      </footer>
    </>
  );
}
