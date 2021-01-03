import User from "./User";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const user = {
    id: 1,
    username: "조인혁",
  };
  return (
    <ErrorBoundary>
      <User user={user} />
    </ErrorBoundary>
  );
}

export default App;
