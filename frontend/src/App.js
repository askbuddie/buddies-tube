import React from 'react';
import Button from './components/Button';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <a
            className="App-link"
            href="http://askbuddie.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask Buddie
          </a>
          &apos;s Buddies Tube
        </h1>

        <Button modifier="Button--cta">Start Streaming</Button>
      </header>
    </div>
  );
}

export default App;
