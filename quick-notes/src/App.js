import './App.css';
import Header from "./components/Header";
import NotesInput from './components/NotesInput';
import NotesList from './components/NotesList';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Signin from './components/Signin';
function App() {
  return (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <NotesInput />
          <NotesList />
        </Route>
        <Route path="/login" component={Signin}>
          
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
