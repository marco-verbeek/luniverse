import Menu from './components/Menu.jsx';
import './App.css';

import gnarVideo from './splash/gnar.mp4';

function App() {
  return (
    <div className="App">
      <video autoPlay loop muted>
        <source src={gnarVideo} type="video/mp4" />
      </video>
      <Menu />
    </div>
  );
}

export default App;
