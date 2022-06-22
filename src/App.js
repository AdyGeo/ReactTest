import './App.css';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}

export default App;
