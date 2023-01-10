import Menu from './components/Menu.jsx';
import './App.css';

// @ts-ignore
import gnarVideo from './splash/gnar.mp4';
// @ts-ignore
import gnarAudio from './splash/gnar.mp3';
import { Avatar, Stack } from '@mui/material';
import logo from './splash/logo.png';

function App() {
  return (
    <div className="App">
      <video autoPlay loop muted>
        <source src={gnarVideo} type="video/mp4" />
      </video>
      <audio autoPlay>
        <source src={gnarAudio} type="audio/mpeg" />
      </audio>

      <Stack alignItems="center">
        <Avatar
          className="logo"
          sx={{
            width: 92,
            height: 92,
            position: 'relative',
            top: '4.5vh',
            zIndex: 101,
          }}
          src={logo}
        />
        <Menu />
      </Stack>

      <p>TODO: Mute music, disable animations</p>
    </div>
  );
}

export default App;
