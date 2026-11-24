import { Title } from '@solidjs/meta';
import { For } from 'solid-js';
import users from '../../data/users.json';
import { paths } from '../../router';

export default function UsersIndex() {
  return (
    <section>
      <Title>Users | prsm</Title>
      <ul>
        <For each={Object.entries(users)}>
          {([id, user]) => (
            <li>
              <a href={paths.users(Number(id))}>{user.name}</a>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
