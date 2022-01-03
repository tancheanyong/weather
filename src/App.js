import { useState,useEffect,useRef} from 'react';
import { FaSearch } from "react-icons/fa";

const api = {
  key: "91b924e946dc78229ede1a12224881d1",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather,setWeather] =useState([]);
  const [clock,setClock] = useState('0:00:00 AM');
  
  const stateRef=useRef();
  stateRef.current =weather;

  const isFirstRun=useRef(true);

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
  
  useEffect(()=>{
    if(isFirstRun.current){
      isFirstRun.current=false;
      return;
    }
    setInterval(() => {
      let t= new Date();
      let time=new Date(t.getTime()+(t.getTimezoneOffset()*60000)+(stateRef.current.timezone*1000));
      console.log(stateRef.current.timezone)
      setClock(time.toLocaleTimeString());
    }, 1000);
  },[weather])


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
    <div className={(typeof weather.main != 'undefined' ? (`App `+stateRef.current.weather[0].main): 'App')}>
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
              <div className="time">{clock}</div>
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
