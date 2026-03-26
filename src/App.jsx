import { Routes, Route, Navigate } from 'react-router-dom';
import ExperienceShell from './components/layout/ExperienceShell';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { ROUTES } from './config/routes';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={ROUTES.home} element={<ExperienceShell />} />
        <Route path={ROUTES.vault} element={<ExperienceShell />} />
        <Route path={ROUTES.cloud} element={<ExperienceShell />} />
        <Route path={ROUTES.organic} element={<ExperienceShell />} />
        <Route path={ROUTES.urban} element={<ExperienceShell />} />
        <Route path={ROUTES.abstract} element={<ExperienceShell />} />
        <Route path={ROUTES.ar} element={<ExperienceShell />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
