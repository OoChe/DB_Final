import logo from './logo.svg';
import './App.css';
import Header from '../src/components/Header.jsx'

function App() {
  return (
    <div className="App">
      헤더 들어갈 공간
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
