import { useState,useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

const api = {
  key: "73916e94274abc0225c6d6e3c8b6a997",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather,setWeather] =useState([]);

  const search = (e) =>{
    e.preventDefault();
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    
  }
  const timeBuilder = () =>{
    let t= new Date();
    let time=new Date(t.getTime()+(t.getTimezoneOffset()*60000)+(weather.timezone*1000));
    console.log(time.getHours());
    return time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
    

  const dateBuilder = (d) =>{
    const months=["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
    const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
    
  }
  
  const upperCase=(str)=>{
    return str.split(" ").map(word => word[0].toUpperCase()+word.slice(1)).join(" ");
  }

  return (
    <div className={(typeof weather.main != 'undefined' ? ((weather.main.temp>16) ? 'App warm':'App'): 'App')}>
      <main>
        <form className="searchBox">
          <input 
            type="text"
            className='searchBar'
            placeholder='Search...'
            onChange={e=> setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" onClick={search} className='icon'><FaSearch /></button>
        </form>
        {(typeof weather.main !='undefined') ? (
          <div>
            <div className="locationBox">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="time">{timeBuilder()}</div>
            </div>
            <div className="weatherBox">
              <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
              <div className="weather">{upperCase(weather.weather[0].description)}</div>
            </div>
          </div>
        ) : ('')}
      </main>
      
    </div>
  );
}

export default App;
