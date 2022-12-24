import { Component } from 'solid-js';

const DangerZone: Component = () => {
  return (
    <article>
      <p>Danger Zone</p>
      <button class="warning">Reset databases</button>
    </article>
  );
};

export default DangerZone;
