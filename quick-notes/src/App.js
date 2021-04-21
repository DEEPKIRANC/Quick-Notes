import './App.css';
import Header from "./components/Header";
import NotesInput from './components/NotesInput';
import NotesList from './components/NotesList';
function App() {
  return (
    <div className="App">
      <Header />
      <NotesInput />
      <NotesList />
    </div>
  );
}

export default App;
