import type { Component } from 'solid-js';
import DangerZone from './components/DangerZone';

import UsersTable from './components/UsersTable';
import VerifyAccount from './components/VerifyAccount';

const App: Component = () => {
  return (
    <div>
      <h2>Luni Dashboard</h2>
      <div class="grid">
        <UsersTable />
        <VerifyAccount />
        <DangerZone />
      </div>
    </div>
  );
};

export default App;
