import React from 'react';
import User from './User';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const user = {
    id:1,
    username:"callmeshin"
  };
  return (
    <div>
      <ErrorBoundary>
       <User />
      </ErrorBoundary>
    </div>
  );
}

export default App;
