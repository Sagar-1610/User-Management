import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { UsersPage } from './pages/UsersPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UsersPage />
    </ThemeProvider>
  );
}

export default App;
