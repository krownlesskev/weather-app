// Using axios to handle get requests for APIs
import Axios from 'axios';
import { useState, useEffect } from 'react';

const WeatherComponent = ({ minTemp, maxTemp, weatherIcon }) => {
  const currentDate = new Date();
  const dayOfTheWeekNumber = currentDate.getDay();
  let dayOfTheWeek = '';
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
    <div>
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
  const apiKey = '3f6820661329be846a6d89b4fa860d8f';
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState('');


  // This API call will run when the App component is rendered
  // Once it is run, it will pull data from the API and assign it appropriate variables
  useEffect(() => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid=${apiKey}&units=metric`)
      .then((res) => {
        setMinTemp(res.data.main.temp_min);
        setMaxTemp(res.data.main.temp_max);
        setWeatherIcon(res.data.weather[0].icon);
      });
  }, []);



  return (
    <div>
      <WeatherComponent minTemp={minTemp} maxTemp={maxTemp} weatherIcon={weatherIcon} />
    </div>
  );
}

export default App;
