import { Stack } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack bgcolor="#0a2647" height="100%">
        <Routes>
          <Route path="p/:summonerName" element={<Profile />} />
        </Routes>
      </Stack>
    </QueryClientProvider>
  );
}

export default App;
