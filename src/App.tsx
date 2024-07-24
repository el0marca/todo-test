import './App.css';
import { TodosPage } from './pages';
import { ContextProvider } from './store/contextProvider.tsx';

function App() {
  return (
    <ContextProvider>
      <TodosPage />
    </ContextProvider>
  );
}

export default App;
