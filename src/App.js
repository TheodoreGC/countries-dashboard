import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <lids-masthead>
        <h1 slot="title">Where from?</h1>
        <div slot="action">
          <lids-icon name="moon" width="20px" height="20px"></lids-icon>
          <span>Dark Mode</span>
        </div>
      </lids-masthead>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
