import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import LoginIn from './Login/LoginIn.jsx';
// import Forgetpassword from './Login/Forgetpassword.jsx';
// import Opt from './Login/Opt.jsx';
// import Newpassword from './Login/Newpassword.jsx';
import Togo from './foradmin/Togo.jsx';
import {  useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    return savedLoginStatus === 'true'; 
  });



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
            {/* <Route path='/Forgetpassword' element={<Forgetpassword />} />
            <Route path='/Opt' element={<Opt />} />
            <Route path='/Newpassword' element={<Newpassword />} /> */}
                        <Route path='*' element={<LoginIn setIsLoggedIn={setIsLoggedIn} />} />

          </Routes>
          </div>
        )}
        
    </BrowserRouter>

  );
}

export default App;
