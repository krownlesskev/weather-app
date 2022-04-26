// Using axios to handle get requests for APIs
import Axios from 'axios';
import { useState, useEffect } from 'react';
import './styles.scss';


const WeatherComponent = ({ minTemp, maxTemp, weatherIcon }) => {
  const currentDate = new Date();
  const dayOfTheWeekNumber = currentDate.getDay();
  let dayOfTheWeek = '';

  // This switch statement works in correalation with the IMG tag below, the url acts as a get request
  // The IMG tag determines what Icon to render based on the day of the week it is
  // in the location of the city.
  switch (dayOfTheWeekNumber) {
    case 0:
      dayOfTheWeek = 'Sun';
      break;
    case 1:
      dayOfTheWeek = 'Mon';
      break;
    case 2:
      dayOfTheWeek = 'Tue';
      break;
    case 3:
      dayOfTheWeek = 'Wed';
      break;
    case 4:
      dayOfTheWeek = 'Thu';
      break;
    case 5:
      dayOfTheWeek = 'Fri';
      break;
    case 6:
      dayOfTheWeek = 'Sat';
      break;
    default:
      return 'error';
  }

  return (
    <div className='weather-component-container'>
      <h1 className='day-of-the-week'>{dayOfTheWeek}</h1>
      <div className='weather-icon'>
        <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon" />
      </div>
      <div>
        <p className='min-temp'>{minTemp}</p>
        <p className='max-temp'>{maxTemp}</p>
      </div>
    </div>
  );
};


function App() {
  // Because this is a frontend excercise, I am unable to define my apikey in an enviroment variable.
  // If this had been a fullstack app, I could have stored it on my backend server
  const apiKey = '3f6820661329be846a6d89b4fa860d8f';
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState('');


  // This API call will run when the App component is rendered
  // Once it is run, it will pull data from the API and assign it to appropriate states
  // The location is hardcoded for the purpose of this excercise : Winnipeg
  useEffect(() => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid=${apiKey}&units=metric`)
      .then((res) => {
        console.log(res.data);
        setMinTemp(Math.round(res.data.main.temp_min));
        setMaxTemp(Math.round(res.data.main.temp_max));
        setWeatherIcon(res.data.weather[0].icon);
      });
  }, []);



  return (
    <div className='app-container'>
      {/* The Weather Component takes those states and uses them as props */}
      <WeatherComponent minTemp={minTemp} maxTemp={maxTemp} weatherIcon={weatherIcon} />
    </div>
  );
}

export default App;
