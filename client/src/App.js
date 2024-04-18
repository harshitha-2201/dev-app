import './App.css';
import '../src/components/styles.css'
import Home from '../src/components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AllProfiles from './components/AllProfiles';

import {BrowserRouter , Route , Routes} from 'react-router-dom'
import MyProfile from './components/MyProfile';
import Indprofile from './components/Indprofile';

function App() {
  return (
       <div>
<BrowserRouter>
<Routes>
  <Route exact path = '/' element = {<Home/>}/>
  <Route exact path = '/register' element = {<Register/>}/>
  <Route exact path = '/login' element = {<Login/>}/>
  <Route exact path = '/allprofiles' element = {<AllProfiles/>}/> 
  <Route exact path = '/myprofile' element = {<MyProfile/>}/>
  <Route exact path = '/indprofile/:fullname/:email/:skill/:id' element = {<Indprofile/>}/>

</Routes>
</BrowserRouter>
       </div>
  );
}

export default App;
