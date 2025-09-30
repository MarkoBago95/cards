import ClientForm from './components/ClientForm';
import ClientSearch from './components/ClientSearch';
export default function App() {
  return (
    <div className="app-shell">
      <h2 className="section-title">Kreditne kartice (React)</h2>
      <ClientForm />
      <ClientSearch />
    </div>
  );
}

