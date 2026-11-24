import { Title } from '@solidjs/meta';
import GitHubRepos from '../GitHubRepos';

export default function Projects() {
  return (
    <main class="page-content">
      <Title>prsm | projects</Title>
      <section class="listing-section" aria-labelledby="projects-title">
        <div class="list-heading">
          <h1 id="projects-title">Projects</h1>
          <a
            href="https://github.com/dotprsm?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            See all repos
          </a>
        </div>
        <GitHubRepos limit={100} />
      </section>
    </main>
  );
}
