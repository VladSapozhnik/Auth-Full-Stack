import { Route, Routes, useNavigate} from 'react-router-dom';
import './App.css'
import AuthForm from './Router/AuthForm';
import TestForm from './Router/TestsForm';
import { useEffect } from 'react';
import Navigate from './components/Navigatate';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = localStorage.getItem("hash");
    if (hash) {
      navigate('/tests')
    } else {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Navigate />
      <Routes>
        <Route path="/" element={<AuthForm/>}/>
        <Route path="/tests" element={<TestForm/>}/>
      </Routes>
    </>
  )
}

export default App
