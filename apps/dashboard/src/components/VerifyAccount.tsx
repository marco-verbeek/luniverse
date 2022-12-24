import { Component } from 'solid-js';
import './VerifyAccount.css';

// TODO: implement Verify button logic
const VerifyAccount: Component = () => {
  return (
    <article>
      <p>Verify Account</p>
      <form>
        <input type="text" placeholder="discordId" />
        <button type="submit">Verify</button>
      </form>
    </article>
  );
};

export default VerifyAccount;
