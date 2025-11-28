import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SalesPersons from './pages/SalesPersons';
import Notes from './pages/Notes';
import Settings from './pages/Settings';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="salespersons" element={<SalesPersons />} />
            <Route path="notes" element={<Notes />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
