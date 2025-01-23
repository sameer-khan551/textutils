import React, { useState} from 'react'
import axios from 'axios'


export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase()
        setText(newText)
        props.showAlert('Converted to Upper Case', 'success')
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase()
        setText(newText)
        props.showAlert('Converted to Lower Case', 'success')
    }

    const handleClearClick = () => {
        setText('')
        props.showAlert('Text box cleared', 'success')
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const handleOnChangeLanguage = (event) => {
        setLanguage(event.target.value)
        
    }

    const hanldeExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));     
        props.showAlert('Extra spaces removed', 'success')
    }

    const handleCopy = () => {
        var text = document.getElementById('myBox')
        text.select();
        text.setSelectionRange(0,9999);
        navigator.clipboard.writeText(text.value)
        props.showAlert('Text copied', 'success')
    }

    const handleTranslate = async () => {
        if (!text || !language) {
            console.error('Text or language is missing');
            return;
        }

        console.log('Request data:', {
            q: text,
            source: 'en',
            target: language,
            format: 'text'
        });

        try {
            const response = await axios.post('https://libretranslate.com/translate', {
                q: text,
                source: 'en',
                target: language,
                format: 'text'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setText(response.data.translatedText);
        } catch (error) {
            console.error('Error translating text:', error);
            console.error('Full error response:', error.response.data);
        }
    };

    const [text, setText] = useState('Enter text here')
    const [language, setLanguage] = useState('es')

    return (
        <>
        <div className='container' style={{color: props.mode === 'dark'? 'white': '#042743'}}>
            <h1>{props.heading}</h1>
                <div className="col-md-2">
                    <select className="form-select small-select" value={language} onChange={handleOnChangeLanguage}>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                    </select>
                </div>
                <div className="my-3">
                    <textarea onChange={handleOnChange}  className="form-control" style={{backgroundColor: props.mode === 'dark'? 'grey': 'white', 
                    color: props.mode === 'dark'? 'white': '#042743'}} id="myBox" rows="8" value={text}></textarea>
                </div>
                <button disabled={text.length === 0} onClick={handleUpClick} className='btn btn-primary mx-2 my2'>Upper Case</button>
                <button  disabled={text.length === 0} onClick={handleLoClick} className='btn btn-secondary mx-2 my2'>Lower Case</button>
                <button  disabled={text.length === 0} onClick={handleTranslate} className='btn btn-secondary mx-2 my2'>Translate</button>
                <button disabled={text.length === 0}  onClick={handleCopy} className='btn btn-secondary mx-2 my2'>Copy</button>
                <button  disabled={text.length === 0} onClick={hanldeExtraSpaces} className='btn btn-secondary mx-2 my2'>Remove Extra Spaces</button>
                <button  disabled={text.length === 0} onClick={handleClearClick} className='btn btn-danger mx-2 my2'>Clear</button>
    
        </div>
        
        <div className='container my-2' style={{color: props.mode === 'dark'? 'white': '#042743',}}>
            <h1>Your text summary</h1>
            <p>{text.split(" ").filter((element) => {return element.length !== 0}).length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").length}  Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length >0 ? text: "Enter something in the text above to preview here"}</p>
        </div>
    </>
    )
}
