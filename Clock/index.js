// CLOCK
// Variables
const time = document.querySelector(".clock__time");
const date = document.querySelector(".clock__date");

// Function to get current time
function getTime(){
    const dateObject = new Date();

    // Initialize current times, Date Object method returns the value as integer
    const currentHour = dateObject.getHours();
    const currentMinute = dateObject.getMinutes();
    const currentSecond = dateObject.getSeconds();

    /*
    Casting integer to String and padding the strings to get it in desired form (hh:mm:ss)
    by using String medthod .padStart()
    */
    const currentHourToString = String(currentHour).padStart(2, "0");
    const currentMinuteToString = String(currentMinute).padStart(2, "0");
    const currentSecondToString = String(currentSecond).padStart(2, "0");

    // To update the current time to HTML tag
    time.textContent = `${currentHourToString}:${currentMinuteToString}:${currentSecondToString}`;
}

// Function to get current date
function getDate(){
    const dateObject = new Date();

    // Initialize current date, Date Object method returns the value as integer
    const currentMonth = dateObject.getMonth() + 1;
    const currentDay = dateObject.getDate();
    const currentYear = dateObject.getFullYear();

    /*
    Casting integer to String and padding the strings to get it in desired form (mm:dd:year)
    by using String medthod .padStart()
    */
    const currentMonthToString = String(currentMonth).padStart(2, "0");
    const currentDayToString = String(currentDay).padStart(2, "0");
    const currentYearToString = String(currentYear).padStart(2, "0");
    
    // To update the current time to HTML tag
    date.textContent = `${currentMonthToString}-${currentDayToString}-${currentYearToString}`;
}

// Initial display setup
getTime();
getDate();

// To update the values every 1000 mil-second
setInterval(getTime, 1000);
setInterval(getDate, 1000);

//WEATHER
const API_KEY = '6f1854f28d44869721008225da0a3b5b';
const weatherSection = document.querySelector('.weather-container')
const weatherInfoList = document.querySelector('.weather-info')


const toCelDegree = kelDegree => (kelDegree - 273.15).toFixed(1)

function onNavigatorSuccess(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  
  fetch(API_URL).then(response => response.json())
  .then(data => {
    const locationEl = document.createElement('li') 
    const degreeInCel = document.createElement('ul') 
    const icon = document.createElement('li') 
    const humidity = document.createElement('li') 
    const wind = document.createElement('li') 

    locationEl.innerHTML = `<li>${data.name}</li>`;
    degreeInCel.innerHTML = `<ul class="weather-info__degree"></ul>`
    icon.innerHTML = `<li><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></li>`
    humidity.innerHTML =`<li>습도: ${ data.main.humidity }</li>`
    wind.innerHTML = `<li>풍속: ${ data.wind.speed }</li>`

    weatherInfoList.append(locationEl)
    weatherInfoList.append(degreeInCel)
    weatherInfoList.append(icon)
    weatherInfoList.append(humidity)
    weatherInfoList.append(wind)
    

    const degreeList = document.querySelector('.weather-info__degree')
    degreeList.innerHTML= ` <li>현재 온도: ${ toCelDegree(data.main.temp) }</li>
                            <li>체감 온도: ${data.main.feels_like}</li>
                            <li>최대 온도: ${data.main.temp_max}</li>
                            <li>최저 온도: ${data.main.temp_min}</li>
                            <li>기압: ${data.main.pressure}</li>`


  })

}

function onNavigatorFail () {
  const alert = document.createElement('span')
  alert.innerHTML = `<span>날씨 정보는 사용자의 위치 정보를 기반으로 제공됩니다. 동의하지 않으실 경우 사용이 제한됩니다.</span>`
  weatherSection.append(alert)
}

navigator.geolocation.getCurrentPosition(onNavigatorSuccess, onNavigatorFail);