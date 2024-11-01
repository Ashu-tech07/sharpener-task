
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/Pages/SignUp';
import Welcome from './components/Pages/Welcome';
import {useSelector} from 'react-redux'
import ForgotPassword from './components/Pages/ForgotPassword';

function App() {

  const isAuth=useSelector(state=>state.auth.isAuthenticate)

  console.log(isAuth);

  return (
    <>
      <Routes>
      <Route path='/' element={isAuth ? <Welcome /> : <SignUp />}></Route>
      <Route path='/welcome' element={!isAuth ? <Welcome /> : <SignUp />} />
      <Route path='/forgotPassword' element={!isAuth ? <ForgotPassword /> : <Welcome />} /> 
      </Routes>
      </>
  );
}
export default App;