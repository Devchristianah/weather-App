import React, { useState }  from 'react';
import './App.css';

const api={
  key:"884fa2230bb21cd0191a9516e4e65b09",
  base:"http://api.openweathermap.org/data/2.5/"
}
const link={image: "https://openweathermap.org/img/wn/"}
function App() {

  const[query,setQuery] =useState("");
  const[weather,setweather]= useState({});

  const searchHandler =evt =>{
    if(evt.key ==="Enter") {
      fetch(`${api.base}weather?q=${query}
      &units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(data=>{setweather(data);
        setQuery('');
        console.log(data)
    });
    }
  }
    


  const dateHandler =(d)=>{
  let months =["January","February","March","April","May",
  "June","July","August","September","October","November",
  "December"];
  let days =["Sunday","Monday","Tuesday","Wednesday","Thursday",
  "Friday","Saturday"];



  let day= days[d.getDay()];
  let date= d.getDate();
  let month=months[d.getMonth()];
  let year= d.getFullYear();

  return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main!="undefined")
    ?((weather.main.temp>16)
    ?"App warm" :"App"):"App"}>
      <main>
        <div className='searchbox'>
          <input  
          type="text"
          className= 'searchbar'
          placeholder='Search...'
          onChange={e=> setQuery(e.target.value)}
          value={query}
          onKeyPress={searchHandler}
          />
        </div>
        {(typeof weather.main !="undefined")?(
        <div>
         <div className='locationbox'>
          <div className='location'>{weather.name},{weather.sys.country}</div>
          <div className='date'>{dateHandler(new Date())}</div>

        </div>
        <div className="weatherbox">
          <div className='temp'>
           {Math.round(weather.main.temp)}°C  
           </div>
          <div className='weather'>{weather.weather[0].main}
          <img src={`${link.image}${weather.weather[0].icon}.png`}alt=""/>
          </div>
        </div>
        </div>
        ):("")}
      </main>
    </div>
  );
}

export default App;
