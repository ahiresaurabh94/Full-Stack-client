import React from 'react';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Activity from './components/activity/activity';
import Login from './components/login/login';
import Register from './components/registratiton/register';
import SetActivity from './components/setActivity/set';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/activity' element={<Activity/>}/>
          <Route path='/setActivity' element={<SetActivity/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
