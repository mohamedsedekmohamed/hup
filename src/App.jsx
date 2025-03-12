import { BrowserRouter , Route, Routes  } from 'react-router-dom';
import Dash from './pages/Dash/Dash.jsx';
import Home from './pages/Home/Home.jsx';
import User from './pages/User/User.jsx';
import AddUser from './pages/User/AddUser.jsx';
import Location from './pages/Location/Location.jsx';
import Buses from './pages/Buses/Buses.jsx';
// import WalletRequsts from './pages/WalletRequsts/WalletRequsts.jsx'
function App() {
  return (
    <BrowserRouter>

      <div className='flex overflow-hidden'>
       <Dash/>
       <div className='w-full  justify-center flex-col'>
       <Home/>
       <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/User' element={<User/>}/> 
        <Route path='/AddUser' element={<AddUser/>}/> 
        <Route path='/Buses/*' element={<Buses/>}/>
        <Route path='/Location/*' element={<Location/>}/>
        {/* <Route path='WalletRequsts'     element={<WalletRequsts/>}/> */}
       </Routes>
       </div> 
      
        </div>
        </BrowserRouter>



  )
}

export default App
