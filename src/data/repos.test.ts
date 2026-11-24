import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  fetchGitHubLanguageColors,
  fetchGitHubRepos,
  getLanguageColor,
  type GitHubRepo,
} from './repos';

function apiResponse(payload: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 403 ? 'Forbidden' : 'OK',
    json: async () => payload,
  } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('GitHub repositories', () => {
  test('returns owned repositories and excludes forks', async () => {
    const repository: GitHubRepo = {
      id: 1,
      name: 'sample',
      html_url: 'https://github.com/dotprsm/sample',
      description: 'A sample project',
      language: 'Swift',
      fork: false,
    };
    const fork = { ...repository, id: 2, name: 'fork', fork: true };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(apiResponse([repository, fork])));

    await expect(fetchGitHubRepos()).resolves.toEqual([repository]);
  });

  test('surfaces GitHub API failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(apiResponse([], 403)));

    await expect(fetchGitHubRepos()).rejects.toThrow(
      'GitHub API request failed (403 Forbidden).',
    );
  });

  test('rejects malformed repository data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(apiResponse([{}])));

    await expect(fetchGitHubRepos()).rejects.toThrow(
      'GitHub returned an invalid repository record.',
    );
  });

  test('loads language colors from the GitHub API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        apiResponse({
          JavaScript: { color: '#f1e05a', url: 'https://github.com/trending?l=JavaScript' },
          Swift: { color: '#f05138', url: 'https://github.com/trending?l=Swift' },
          Uncolored: { color: null, url: 'https://github.com/trending?l=Uncolored' },
        }),
      ),
    );

    const colors = await fetchGitHubLanguageColors();

    expect(colors).toEqual({ JavaScript: '#f1e05a', Swift: '#f05138' });
    expect(getLanguageColor('JavaScript', colors)).toBe('#f1e05a');
    expect(getLanguageColor('Unlisted language', colors)).toBe('#8b949e');
    expect(getLanguageColor(null, colors)).toBe('#8b949e');
  });
});
