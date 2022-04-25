// Using axios to handle get requests for APIs
import Axios from 'axios';
import { useEffect } from 'react';

const WeatherComponent = () => {
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
    case 1:
      dayOfTheWeek = 'Tue';
      break;
    case 1:
      dayOfTheWeek = 'Wed';
      break;
    case 1:
      dayOfTheWeek = 'Thu';
      break;
    case 1:
      dayOfTheWeek = 'Fri';
      break;
  }

  return (
    <div>
      <h1 className='day-of-the-week'>{dayOfTheWeek}</h1>
      <div className='weather-icon'></div>
      <div>
        <p className='min-temp'></p>
        <p className='max-temp'></p>
      </div>
    </div>
  );
};


function App() {
  const apiKey = '3f6820661329be846a6d89b4fa860d8f';

  // This API call will run when the App component is rendered
  // Once it is run, it will pull data from the API and assign it appropriate variables
  useEffect(() => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid=${apiKey}&units=metric`)
      .then((res) => {
        const response = res.data;
        const currentMinTemp = res.data.main.temp_min;
        const currentMaxTemp = res.data.main.temp_max;
        const weatherIcon = res.data.weather.icon;
        console.log(res.data);
      });
  }, []);



  return (
    <div>
      <WeatherComponent />
    </div>
  );
}

export default App;
