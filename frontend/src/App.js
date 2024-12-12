import React from 'react';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import './styles/global.css'; // Import global styles

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Management System</h1>
      </header>

      <Dashboard /> {/* Include the Dashboard component */}
    </div>
  );
};

export default App;
