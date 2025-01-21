import './App.css';
// import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
  return (
    <>
      <Navbar  title='TextUtils' aboutText='About'/>
      <div className='my-4 container'>
      {/* <About /> */}
      <TextForm heading="Enter the text to analyze"/>
      </div>
      
    </>
  );
}

export default App;
