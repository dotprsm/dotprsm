import type { ParentProps } from 'solid-js';
import { HydrationScript } from '@solidjs/web';

export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0e0e11" />
        <meta
          name="description"
          content="prsm — a 15-year-old self-taught programmer proficient in Swift and learning JavaScript."
        />
        <title>prsm | home</title>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
