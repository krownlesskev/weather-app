// Using axios to handle get requests for APIs
import Axios from 'axios';
import { useState, useEffect } from 'react';
import './styles.scss';


const WeatherComponent = ({
  minTemp,
  maxTemp,
  weatherIcon,
  day0,
  day1,
  day2,
  day3,
  today
}) => {
  const currentDate = new Date();
  let currentDayOfTheWeekNumber = 0;
  let currentDayOfTheWeek = '';


  // This if statement determines which day of the week it is based on the day# prop passed to the component
  if (day0) {
    currentDayOfTheWeekNumber++;
  } else if (day1) {
    for (let i = 0; i < 2; i++) {
      currentDayOfTheWeekNumber++;
    }
  } else if (day2) {
    for (let i = 0; i < 3; i++) {
      currentDayOfTheWeekNumber++;
    }
  } else if (day3) {
    for (let i = 0; i < 4; i++) {
      currentDayOfTheWeekNumber++;
    }
  }

  if (currentDayOfTheWeekNumber === 7) {
    currentDayOfTheWeekNumber = 0;
  } else if (currentDayOfTheWeekNumber === 8) {
    currentDayOfTheWeekNumber = 1
  } else if (currentDayOfTheWeekNumber === 9) {
    currentDayOfTheWeekNumber = 2
  } else if (currentDayOfTheWeekNumber === 10) {
    currentDayOfTheWeekNumber = 3
  }




  // This switch statement works in correalation with the IMG tag below, the url acts as a get request
  // The IMG tag determines what Icon to render based on the day of the week it is
  // in the location of the city.
  switch (currentDayOfTheWeekNumber) {
    case 0:
      currentDayOfTheWeek = 'Sun';
      break;
    case 1:
      currentDayOfTheWeek = 'Mon';
      break;
    case 2:
      currentDayOfTheWeek = 'Tue';
      break;
    case 3:
      currentDayOfTheWeek = 'Wed';
      break;
    case 4:
      currentDayOfTheWeek = 'Thu';
      break;
    case 5:
      currentDayOfTheWeek = 'Fri';
      break;
    case 6:
      currentDayOfTheWeek = 'Sat';
      break;
    default:
      return 'error';
  }

  return (
    <div className={today ? 'weather-component-card-container-today' : 'weather-component-card-container'}>
      <h1>{currentDayOfTheWeek}</h1>
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



  /* 
  This first useEffect makes a get request for the CURRENT weather and assigns
  the proper DATA into the predefined states above, This information is then used
  to render a weather component on the App 
  */
  useEffect(() => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid=${apiKey}&units=metric`)
      .then((res) => {
        setCurrentMinTemp(Math.round(res.data.main.temp_min));
        setCurrentMaxTemp(Math.round(res.data.main.temp_max));
        setCurrentWeatherIcon(res.data.weather[0].icon);
      });
  }, []);

  /*
  The second useEffect makes a get request for the NEXT FIVE DAYS and assigns
  the data to the states defined above. These starts are used also to render
  weather components on the app
   */
  useEffect(() => {
    Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Winnipeg&appid=${apiKey}&units=metric`)
      .then((res) => {
        setMinTemp0(Math.round(res.data.list[0].main.temp_min));
        setMaxTemp0(Math.round(res.data.list[0].main.temp_max));
        setWeatherIcon0(res.data.list[0].weather[0].icon);
        setMinTemp1(Math.round(res.data.list[6].main.temp_min));
        setMaxTemp1(Math.round(res.data.list[6].main.temp_max));
        setWeatherIcon1(res.data.list[6].weather[0].icon);
        setMinTemp2(Math.round(res.data.list[14].main.temp_min));
        setMaxTemp2(Math.round(res.data.list[14].main.temp_max));
        setWeatherIcon2(res.data.list[14].weather[0].icon);
        setMinTemp3(Math.round(res.data.list[22].main.temp_min));
        setMaxTemp3(Math.round(res.data.list[22].main.temp_max));
        setWeatherIcon3(res.data.list[22].weather[0].icon);
      });
  }, []);



  return (
    <div className='app-container'>
      <div className='weather-component-container'>
        {/* The Weather Component takes the states defined above and uses them as props */}
        <WeatherComponent minTemp={currentMinTemp} maxTemp={currentMaxTemp} weatherIcon={currentWeatherIcon} today />
        <WeatherComponent minTemp={minTemp0} maxTemp={maxTemp0} weatherIcon={weatherIcon0} day0 />
        <WeatherComponent minTemp={minTemp1} maxTemp={maxTemp1} weatherIcon={weatherIcon1} day1 />
        <WeatherComponent minTemp={minTemp2} maxTemp={maxTemp2} weatherIcon={weatherIcon2} day2 />
        <WeatherComponent minTemp={minTemp3} maxTemp={maxTemp3} weatherIcon={weatherIcon3} day3 />
      </div>
    </div>
  );
}

export default App;
