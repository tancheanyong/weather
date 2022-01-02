
const LocalWeather = ({local,setlocal,time,setTime}) => {

    
    return (
        <div id="LocalWeather">
            <div className="container">
                <form>
                    
                </form>
                <ul>
                    <li><b>Temperature: </b>{local}</li>
                </ul>
            </div>
        </div>
    )
}

export default LocalWeather
