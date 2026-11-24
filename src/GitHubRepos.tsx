import { createSignal, For, onSettled, Show } from 'solid-js';
import {
  fetchGitHubLanguageColors,
  fetchGitHubRepos,
  getLanguageColor,
  type GitHubRepo,
} from './data/repos';

export default function GitHubRepos(props: { limit?: number }) {
  const [repositories, setRepositories] = createSignal<GitHubRepo[]>([]);
  const [languageColors, setLanguageColors] = createSignal<Record<string, string>>({});
  const [isLoading, setIsLoading] = createSignal(true);
  const [repoError, setRepoError] = createSignal<string | null>(null);
  const [colorError, setColorError] = createSignal<string | null>(null);

  onSettled(() => {
    let active = true;

    fetchGitHubRepos(props.limit)
      .then((result) => {
        if (!active) return;
        setRepositories(result);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setRepoError(error instanceof Error ? error.message : String(error));
        setIsLoading(false);
      });

    fetchGitHubLanguageColors()
      .then((result) => {
        if (active) setLanguageColors(result);
      })
      .catch((error: unknown) => {
        if (active) setColorError(error instanceof Error ? error.message : String(error));
      });

    return () => {
      active = false;
    };
  });

  return (
    <>
      <Show when={isLoading()}>
        <p class="repo-status" aria-live="polite">Loading repositories…</p>
      </Show>
      <Show when={repoError() !== null}>
        <p class="repo-error" role="alert">
          Could not load repositories: {repoError()}
        </p>
      </Show>
      <Show when={colorError() !== null}>
        <p class="repo-error" role="alert">
          Could not load language colors: {colorError()}
        </p>
      </Show>
      <Show when={!isLoading() && repoError() === null}>
        <Show
          when={repositories().length > 0}
          fallback={<p class="repo-status">No public repositories found.</p>}
        >
          <ul class="entry-list repo-list">
            <For each={repositories()}>
              {(repo) => (
                <li>
                  <a
                    class="entry-card repo-card"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="entry-copy">
                      <strong>{repo.name}</strong>
                      <small>{repo.description ?? 'No description available.'}</small>
                    </span>
                    <span class="repo-details">
                      <span class="repo-language">
                        <span
                          class="repo-language-dot"
                          style={{
                            'background-color': getLanguageColor(
                              repo.language,
                              languageColors(),
                            ),
                          }}
                          aria-hidden="true"
                        />
                        {repo.language ?? 'No language'}
                      </span>
                    </span>
                  </a>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Show>
    </>
  );
}
