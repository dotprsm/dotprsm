export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  fork: boolean;
}

function parseGitHubRepo(value: unknown): GitHubRepo {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('GitHub returned an invalid repository record.');
  }

  const repo = value as Record<string, unknown>;
  if (
    typeof repo.id !== 'number' ||
    typeof repo.name !== 'string' ||
    typeof repo.html_url !== 'string' ||
    (repo.description !== null && typeof repo.description !== 'string') ||
    (repo.language !== null && typeof repo.language !== 'string') ||
    typeof repo.fork !== 'boolean'
  ) {
    throw new Error('GitHub returned an invalid repository record.');
  }

  return {
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    language: repo.language,
    fork: repo.fork,
  };
}

export async function fetchGitHubRepos(limit = 8): Promise<GitHubRepo[]> {
  const response = await fetch(
    'https://api.github.com/users/dotprsm/repos?type=owner&sort=updated&per_page=100',
    { headers: { Accept: 'application/vnd.github+json' } },
  );

  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status} ${response.statusText}).`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('GitHub returned an invalid repositories response.');
  }

  return payload
    .map(parseGitHubRepo)
    .filter((repo) => !repo.fork)
    .slice(0, limit);
}

export async function fetchGitHubLanguageColors(): Promise<Record<string, string>> {
  const response = await fetch(
    'https://api.github.com/repos/ozh/github-colors/contents/colors.json?ref=master',
    { headers: { Accept: 'application/vnd.github.raw+json' } },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub language color request failed (${response.status} ${response.statusText}).`,
    );
  }

  const payload: unknown = await response.json();
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    throw new Error('GitHub returned invalid language color data.');
  }

  const colors: Record<string, string> = {};
  for (const [language, value] of Object.entries(payload)) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error('GitHub returned invalid language color data.');
    }

    const color = (value as Record<string, unknown>).color;
    if (color === null) continue;
    if (typeof color !== 'string' || !/^#[\da-f]{6}$/i.test(color)) {
      throw new Error('GitHub returned invalid language color data.');
    }

    colors[language] = color;
  }

  if (Object.keys(colors).length === 0) {
    throw new Error('GitHub returned no language colors.');
  }

  return colors;
}

export function getLanguageColor(
  language: string | null,
  colors: Record<string, string>,
): string {
  if (!language) return '#8b949e';
  return colors[language] ?? '#8b949e';
}
