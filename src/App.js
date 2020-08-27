import React, { useState } from 'react';
import Clock from 'react-live-clock';
// import Switch from './switch'

const api = {
  key: "7d52c1e2cd7823463e5abcb379cfeaaf",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App(){

  const [query, setQuery]= useState('');
  const [weather, setWeather]= useState({});
  // const [value, setValue]= useState(false);

  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setQuery('');
        setWeather(result)
        console.log(result);
      });
    }
  }
  
  const dateBuilder=(d) => {
    let months =["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let days = [ "Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} de ${month} de ${year}`;

  }
  var hours= new Date().getHours();
  var status;
  if(hours<19){
    status="app";
  }else{
    status="app night"
  }
  return (
    <div className={status}>
    {/* <Switch
      isOn={value}
      handleToggle={() => setValue(!value)}
    /> */}
      <div className="current-time">
        <Clock format={'HH:mm'} ticking={true} timezone={'America/El_Salvador'} />
      </div>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Buscar Ciudad.."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div>
            <div className="location-box">
            <div className="location"> {weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            </div>
          </div>
            {/* <div className="slide-in-elliptic-top-fwd"> */}
              <div className="weather-box" >
                <div className="temp" >
                  {Math.round(weather.main.temp)} °C
                </div>
                <div className="weather" >
                {weather.weather[0].main}
                </div>
            {/* </div> */}
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
