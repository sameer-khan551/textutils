import React, { useState} from 'react'
import axios from 'axios'


export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase()
        setText(newText)
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase()
        setText(newText)
    }

    const handleClearClick = () => {
        setText('')
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
    }

    const handleCopy = () => {
        var text = document.getElementById('myBox')
        text.select();
        text.setSelectionRange(0,9999);
        navigator.clipboard.writeText(text.value)
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
        <div>
            <h1>{props.heading}</h1>
            <div className='row'>
                <div className="col-md-2">
                    <select className="form-select" value={language} onChange={handleOnChangeLanguage}>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                    </select>
                </div>
            </div>
            <div className="my-3">
                <textarea onChange={handleOnChange}  className="form-control" id="myBox" rows="8" value={text}></textarea>
            </div>
            <div  className='row'>
                <button onClick={handleUpClick} className='btn btn-primary mx-2'>Upper Case</button>
                <button onClick={handleLoClick} className='btn btn-secondary mx-2'>Lower Case</button>
                <button onClick={handleTranslate} className='btn btn-secondary mx-2'>Translate</button>
                <button onClick={handleCopy} className='btn btn-secondary mx-2'>Copy</button>
                <button onClick={hanldeExtraSpaces} className='btn btn-secondary mx-2'>Remove Extra Spaces</button>
                <button onClick={handleClearClick} className='btn btn-danger mx-2'>Clear</button>
            </div>
        </div>
        
        <div className='my-2'>
            <h1>Your text summary</h1>
            <p>{text.split(" ").length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").length}  Minutes read</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
    </>
    )
}
