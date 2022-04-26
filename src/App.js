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
      <h1>{dayOfTheWeek}</h1>
      <div className='weather-icon'>
        <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon" />
      </div>
      <div className='min-max-container'>
        <p className='max-temp'>{maxTemp}&#730;</p>
        <p className='min-temp'>{minTemp}&#730;</p>
      </div>
    </div>
  );
};


function App() {
  // Because this is a frontend excercise, I am unable to define my apikey in an enviroment variable.
  // If this had been a fullstack app, I could have stored it on my backend server
  const apiKey = '3f6820661329be846a6d89b4fa860d8f';
  const [currentMinTemp, setCurrentMinTemp] = useState(0);
  const [currentMaxTemp, setCurrentMaxTemp] = useState(0);
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('');

  const [minTemp0, setMinTemp0] = useState(0);
  const [maxTemp0, setMaxTemp0] = useState(0);
  const [weatherIcon0, setWeatherIcon0] = useState('');

  const [minTemp1, setMinTemp1] = useState(0);
  const [maxTemp1, setMaxTemp1] = useState(0);
  const [weatherIcon1, setWeatherIcon1] = useState('');

  const [minTemp2, setMinTemp2] = useState(0);
  const [maxTemp2, setMaxTemp2] = useState(0);
  const [weatherIcon2, setWeatherIcon2] = useState('');

  const [minTemp3, setMinTemp3] = useState(0);
  const [maxTemp3, setMaxTemp3] = useState(0);
  const [weatherIcon3, setWeatherIcon3] = useState('');



/* This first useEffect makes a get request for the CURRENT weather and assigns
the proper DATA into the predefined states above, This information is then used
to render a weather component on the App */
  useEffect(() => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid=${apiKey}&units=metric`)
      .then((res) => {
        setCurrentMinTemp(res.data.main.temp_min);
        setCurrentMaxTemp(res.data.main.temp_max);
        setCurrentWeatherIcon(res.data.weather[0].icon)
      });
  }, []);



  return (
    <div className='app-container'>
      {/* The Weather Component takes the states defined above and uses them as props */}
      <WeatherComponent minTemp={currentMinTemp} maxTemp={currentMaxTemp} weatherIcon={currentWeatherIcon} />
    </div>
  );
}

export default App;
