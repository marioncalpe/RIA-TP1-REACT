import logo from './logo.svg';
import './App.css';

function App() {
  function test(){
    alert("hello word");
  } 
  return (
    <div className="App">
      <button onClick={test}>
        clic 
      </button>
    </div>
  );
}

export default App;
