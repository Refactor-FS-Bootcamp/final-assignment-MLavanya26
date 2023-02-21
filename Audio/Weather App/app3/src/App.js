import { useState } from 'react';
import './App.css';

function App() {

  const [city,setCity]=useState("")
  const [result,setResult]=useState("")
  const changeHandler=e=>{
    setCity(e.target.value)
  }

  const submitHandler=e=>{
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`).
    then(
      response=>response.json()
    ).then(data=>{
      const kelvin=data.main.temp;  //The data is stored in the main object we are getting the value of temp
      const celsius = kelvin-273.15
      setResult("Temperature at"+" "+city+"\n"+Math.round(celsius)+"\xB0C")
      setCity("");
    })
  }
  return (
    <div >
       <center>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Weather App</h4>
            <form onSubmit={submitHandler}>
              <input type='text' name='city' value={city} onChange={changeHandler} /><br/>
              <input type='submit' value='Get Temperature'/>
            </form>
            <h1>{result}</h1>
          </div>
        </div>
       </center>
    </div>
  );
}

export default App;
