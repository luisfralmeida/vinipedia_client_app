import { Switch, Route } from 'react-router-dom';
import GlobalStyle from './components/global-style';
import Nav from './components/nav';
import WineList from './pages/wine-list';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Nav />
      <Switch>
        <Route path='/' exact>
          <WineList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
