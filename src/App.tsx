import { Loading, onSettled } from 'solid-js';
import { animate } from 'motion/mini';
import { Router } from './router';
import './App.css';

export default function App() {
  onSettled(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const entrance = animate(
      '.page-content',
      { opacity: [0, 1], y: [8, 0] },
      { duration: 0.4, ease: 'easeOut' },
    );

    return () => entrance.stop();
  });

  return (
    <Router>
      {(props) => (
        <div class="site-shell">
          <header class="site-header">
            <a class="site-brand" href="/">prsm</a>
            <nav class="site-nav" aria-label="Main navigation">
              <a href="/blog">blog</a>
              <span aria-hidden="true">/</span>
              <a href="/projects">projects</a>
            </nav>
          </header>
          <Loading fallback={<main class="page-content" aria-label="Loading page" />}>
            {props.children}
          </Loading>
        </div>
      )}
    </Router>
  );
}
