import { Title } from '@solidjs/meta';

export default function NotFoundPage() {
  return (
    <main class="page-content not-found-page">
      <Title>prsm | 404</Title>
      <p class="page-kicker">404</p>
      <h1>Page not found</h1>
      <p>Sorry, there’s nothing at this address.</p>
      <a href="/">Back to the homepage →</a>
    </main>
  );
}
