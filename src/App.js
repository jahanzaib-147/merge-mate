import './App.css';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from "./context/Auth";
import theme from './context/theme';
import AppRoutes from './routes/AppRoutes'
import TaskBoard from './components/TaskBoard/TaskBoard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App;
