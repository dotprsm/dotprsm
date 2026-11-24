import { render, fireEvent } from '@solidjs/testing-library';
import {
  captureArtifact,
  expectNoDiagnostics,
  expectRerunBudget,
} from '@solidjs/diagnostics';
import { flush } from 'solid-js';
import { describe, expect, test } from 'vitest';

import Counter from './Counter';

describe('<Counter />', () => {
  test('it increments on click', () => {
    const { getByRole } = render(() => <Counter />);
    const button = getByRole('button');
    expect(button).toHaveTextContent('Clicks: 0');
    fireEvent.click(button);
    flush();
    expect(button).toHaveTextContent('Clicks: 1');
  });

  test('a click re-runs one scope and trips no diagnostic', async () => {
    const { artifact } = await captureArtifact(
      () => {
        const { getByRole } = render(() => <Counter />);
        const button = getByRole('button');
        fireEvent.click(button);
        flush();
        expect(button).toHaveTextContent('Clicks: 1');
      },
      { scenario: 'counter-click' },
    );
    expectNoDiagnostics(artifact);
    expectRerunBudget(artifact, 1);
  });
});
