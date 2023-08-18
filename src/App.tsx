import './App.css';
import Header from './modules/header/header';
import Noise from './modules/noise/noise';
import Settings from './modules/settings/settings';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="Main">
        <Noise />
        <Settings />
      </main>
    </div>
  );
}

export default App;
