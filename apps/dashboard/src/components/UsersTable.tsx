import { Component, For } from 'solid-js';

import './UsersTable.css';

const testUser = (summonerName: string, level: number, verified: boolean) => {
  return {
    discordId: '0987654321',
    summonerName,
    level,
    verified,
  };
};

const UsersTable: Component = () => {
  // TODO: remove testUser and fetch from API.
  const data = [
    testUser('ItsNexty', 120, true),
    testUser('ItsPhlexy', 220, false),
    testUser('Yakaa', 32, false),
  ];

  return (
    <table role="grid">
      <thead>
        <tr>
          <For each={Object.keys(data[0])}>
            {(item) => <th scope="col">{item}</th>}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={data}>
          {(item) => {
            return (
              <tr>
                <For each={Object.values(item)}>
                  {(x) => <th scope="row">{x.toString()}</th>}
                </For>
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};

export default UsersTable;
