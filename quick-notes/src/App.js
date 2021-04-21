import './App.css';
import Header from "./components/Header";
import NotesInput from './components/NotesInput';
import NotesList from './components/NotesList';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import NoteEditor from './components/NoteEditor';
function App() {
  return (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <NotesInput />
          <NotesList />
        </Route>
        <Route path="/editor">
          <NoteEditor />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
