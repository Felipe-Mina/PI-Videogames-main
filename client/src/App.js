import './App.css';
import store from './redux/store/index';
import { Landing } from './components/Landing/Landing';
import { Home } from './components/Home/Home';
import { Form } from './components/CreateForm/Form';
import { Search } from './components/SearchScreen/Search';
import { GameDetail } from './components/GameDetail/GameDetail';
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path='/' element={ <Landing />} />
          <Route path='/home' element={ <Home />} />
          <Route exact path='/home/:id' element={<GameDetail />} />
          <Route path='/form' element={ <Form />} />
          <Route path='/search' element={ <Search />} />
        </Routes>
      </Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
