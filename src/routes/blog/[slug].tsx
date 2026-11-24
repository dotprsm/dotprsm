import { Title } from '@solidjs/meta';
import { type RouteDefinition, type RouteProps } from '@solidjs/router';
import { createMemo, Show } from 'solid-js';
import { httpStatus } from '@solidjs/web';
import postContent from '../../../blogs/test/test.md?raw';
import NotFoundPage from '../../NotFoundPage';
import { posts } from '../../site-content';

export const route = {
  preload: ({ params }) => {
    if (!posts.some((post) => post.slug === params.slug)) httpStatus(404);
  },
} satisfies RouteDefinition;

export default function BlogPost(props: RouteProps<'/blog/:slug'>) {
  const post = createMemo(() => posts.find((entry) => entry.slug === props.params.slug));

  return (
    <Show when={post()} fallback={<NotFoundPage />}>
      <main class="page-content">
        <Title>{`prsm | ${post()?.title}`}</Title>
        <article class="blog-post">
          <a href="/blog">Back to blog</a>
          <h1>{post()?.title}</h1>
          <time class="entry-date" datetime={post()?.dateTime}>{post()?.date}</time>
          <p class="blog-post-content">{postContent}</p>
        </article>
      </main>
    </Show>
  );
}
