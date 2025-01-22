import { useState } from 'react';
import './App.css';
// import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';

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
    }else{
      setMode('light')
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has unabled", "danger")
    }
  }

  return (
    <>
      <Navbar  title='TextUtils' aboutText='About' mode={mode} toggleMode = {toggleMode}/>
      <Alert alert = {alert}/>
      <div className='my-4 container'>
      {/* <About /> */}
      <TextForm showAlert={showAlert} heading="Enter the text to analyze" mode={mode}/>
      </div>
      
    </>
  );
}

export default App;
