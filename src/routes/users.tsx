import type { ParentProps } from 'solid-js';

export default function UsersLayout(props: ParentProps) {
  return (
    <main>
      <h1>Users</h1>
      {props.children}
    </main>
  );
}
