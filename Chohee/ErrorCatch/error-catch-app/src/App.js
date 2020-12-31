import logo from './logo.svg';
import './App.css';
import User from './components/User';

function App() {
  const user = {
    id: 1,
    username: '김초희'
  };

  return (
    <>
      <User user={user}/>
    </>
  );
}

export default App;