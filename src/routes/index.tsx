import { Title } from '@solidjs/meta';
import GitHubRepos from '../GitHubRepos';

export default function Home() {
  return (
    <main class="page-content home-page">
      <Title>prsm | home</Title>
      <section class="intro">
        <h1>Hi, I’m prsm 👋</h1>
        <p>
          I’m a 15-year-old self-taught programmer, proficient in Swift and
          currently learning JavaScript.
        </p>
        <p>
          Find some of my projects below, or sort through my{' '}
          <a
            href="https://github.com/dotprsm?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            github repos
          </a>
        </p>
      </section>

      <section class="connect-section" aria-labelledby="connect-title">
        <h2 id="connect-title">Socials</h2>
        <p>
          Reach me at these socials, preferably Discord.
        </p>
        <nav class="contact-links" aria-label="Contact links">
          <a
            href="https://discord.com/users/935297099044626482"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <span aria-hidden="true">/</span>
          <a href="https://x.com/dotprsm" target="_blank" rel="noopener noreferrer">
            X
          </a>
          <span aria-hidden="true">/</span>
          <a href="https://github.com/dotprsm" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span aria-hidden="true">/</span>
          <a href="mailto:dotprsm@proton.me">dotprsm@proton.me</a>
        </nav>
      </section>

      <section class="listing-section" aria-labelledby="projects-title">
        <div class="list-heading">
          <h2 id="projects-title">Projects</h2>
          <a
            href="https://github.com/dotprsm?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            See all repos
          </a>
        </div>
        <GitHubRepos />
      </section>
    </main>
  );
}
