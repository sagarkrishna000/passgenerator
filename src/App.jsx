import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)  // For length of the password which is set to 8 as default
  const [number, setNumber] = useState(false)  // To decide whether to include numbers or not, it is set to false as defualt
  const [charAllowed, setCharAllowed] = useState(false)  // To decide whether to include special characters or not, it is set to false as default
  const [ password, setPassword] = useState('')  // To generate Password, it is set as empty as default 
  const passRef = useRef(null)  //Reference to password textbox. It is used as reference which is later used to highlight password on copying, to show that it is copied

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"  // String to generate random password
    if(number) str += "0123456789"  // If statement to check whether to include Numbers or not, if true, it adds the digits to "str" string 
    if(charAllowed) str+= "!@#$%^&*()_+<>?/;:"  // If statement to check whether to include special characters or not
    for(let i = 0; i < length; i++) {   // for statement to generate random numbers to select characters from above string at the i'th position
      const randomNumber = Math.floor(Math.random() *str.length + 1)    //Random number to select the character from str (charAt(i))
      pass+= str.charAt(randomNumber)   // Password variable 
    }
    setPassword(pass)   //setting the value setPassword from empty string to "pass"
  }, [length, number, charAllowed])     // Dependency array

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)  // writeTect - To copy text to clipboard
    passRef.current?.select()  //used to select the copied text
  }

  useEffect(() => {     // To generate password onChange(when length is changed, or when checkbox for number or special character is clicked)
    generatePassword()      // Effect to generate password atleast once when the page is loaded 
  }, [length, number, charAllowed])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-6 bg-gray-700 text-orange-600">
      <h1 className="text-white text-4xl text-center my-5">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden md-12">
        <input type="text" value = {password} className='outline-none w-full py-3 px-3' placeholder='Password' readOnly ref={passRef}/>
        <button onClick={copyPasswordToClipboard} className='outlibe-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-s, gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={18} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} name='' id=''/>
          <label htmlFor="length">Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={number} onChange={() => {setNumber((prev) =>!prev)}} name="" id="" />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) =>!prev)}} name="" id="" />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App

// setCharAllowed((prev) =>!prev : Callback to reverse the Previous value 