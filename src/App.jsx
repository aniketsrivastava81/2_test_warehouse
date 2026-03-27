import { Routes, Route, Navigate } from 'react-router-dom';
import ExperienceShell from './components/layout/ExperienceShell';
import ErrorBoundary from './components/layout/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<ExperienceShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
