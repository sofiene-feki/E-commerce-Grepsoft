import './App.css';
import { Container, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import theme from './styles/theme';
import { UIProvider } from './context/ui';
import Home from './components/pages/Home';
import Chekout from './components/pages/Chekout';
import { useEffect } from 'react';
import UserProvider from './context/ui/User';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/appbar/service/RequireAuth';
import Test from './components/pages/Test';

function App() {
  useEffect(() => {
    document.title = 'React Material UI - Home';
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: '#fff',
        }}
      >
        <Stack>
          <UIProvider>
            <UserProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="Chekout"
                  element={
                    <RequireAuth>
                      <Chekout />
                    </RequireAuth>
                  }
                />
                <Route path="test" element={<Test />} />
              </Routes>
            </UserProvider>
          </UIProvider>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
