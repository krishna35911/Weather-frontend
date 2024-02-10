import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Settings from './Components/Settings';
import Overview from './Components/Overview';
import Welcome from './Components/Welcome';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/overview'} element={<Overview/>}></Route>
        <Route path={'/'} element={<Login/>}></Route>
        <Route path={'/register'} element={<Login register/>}/>
        <Route path={'/settings'} element={<Settings/>}></Route>
        <Route path={'/welcome'} element={<Welcome/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
