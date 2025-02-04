import './App.css';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { About } from './components/About/About';
import { Profile } from './components/Profile/Profile';
import { History } from './components/History/History';
import { Contact } from './components/Contact/Contact';
import Nav from './views/nav/nav';
import Footer from './views/footer/footer';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";

function AppContent() {
  const location = useLocation();

  return (
    <div className='App'>
      {!['/login', '/register'].includes(location.pathname) && (
        <header>
          <Nav />
        </header>
      )}
      <div className='App-body'>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}

export default App;
