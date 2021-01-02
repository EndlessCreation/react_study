import logo from './logo.svg';
import './App.css';
import User from './components/User';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const user = {
    id: 1,
    username: '김초희'
  };

  return (
    <ErrorBoundary>
      <User />
    </ErrorBoundary>
  );
}

export default App;