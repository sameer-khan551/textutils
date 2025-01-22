import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('dark blue')

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message, 
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark Mode has unabled", "success")
      // setInterval(() => {
      //   document.title = "TextUtils - Dark Mode"
      // }, 500);
      // setInterval(() => {
      //   document.title = "TextUtils - Light Mode"
      // }, 500);
    }else{
      setMode('light')
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has unabled", "danger")
    }
  }

  return (
    <>
    <Router>     
      <Navbar  title='TextUtils' aboutText='About' mode={mode} toggleMode = {toggleMode}/>
      <Alert alert = {alert}/>
      <div className='my-4 container'>
      <Routes> 
        <Route path='/' element={<TextForm showAlert={showAlert} heading="Enter the text to analyze" mode={mode} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </Router>
 
    </>
  );
}

export default App;
