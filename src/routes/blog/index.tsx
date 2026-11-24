import { createMemo, createSignal, For, Show } from 'solid-js';
import { Title } from '@solidjs/meta';
import { posts } from '../../site-content';

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="m13 13 4 4" />
    </svg>
  );
}

export default function Blog() {
  const [query, setQuery] = createSignal('');
  const filteredPosts = createMemo(() => {
    const searchTerm = query().trim().toLowerCase();
    return posts.filter((post) =>
      `${post.title} ${post.summary}`.toLowerCase().includes(searchTerm),
    );
  });

  return (
    <main class="page-content">
      <Title>prsm | blog</Title>
      <section class="page-intro">
        <h1>Blog</h1>
        <p>I might do stuff sometimes</p>
      </section>
      <label class="search-field" id="search">
        <SearchIcon />
        <input
          type="search"
          value={query()}
          onInput={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search posts"
          aria-label="Search posts"
        />
      </label>
      <div class="entry-list blog-list">
        <For each={filteredPosts()}>
          {(post) => (
            <a class="entry-card" href={`/blog/${post.slug}`} id={post.slug}>
              <span class="entry-copy">
                <strong>{post.title}</strong>
                <small>{post.summary}</small>
              </span>
              <time class="entry-date" datetime={post.dateTime}>{post.date}</time>
            </a>
          )}
        </For>
        <Show when={filteredPosts().length === 0}>
          <p class="empty-state">No posts found.</p>
        </Show>
      </div>
    </main>
  );
}
