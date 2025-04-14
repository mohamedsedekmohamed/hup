import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import LoginIn from './Login/LoginIn.jsx';
import Togo from './foradmin/Togo.jsx';
import {  useEffect, useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
useEffect(() => {
  if(isLoggedIn){
    setIsLoggedIn(true)
  }else(
    localStorage.clear('token')
  )
}, [isLoggedIn]);
  return (
    
    <BrowserRouter>
        {isLoggedIn ? (
          <>
            <Togo   isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

          </>
        ) : (
          <div className='flex overflow-hidden'>

          <Routes>
            <Route path='/' element={<LoginIn setIsLoggedIn={setIsLoggedIn} />} />
           
                <Route path='*' element={<LoginIn setIsLoggedIn={setIsLoggedIn} />} />

          </Routes>
          </div>
        )}
        
    </BrowserRouter>

  );
}

export default App;
