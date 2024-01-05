//  Student Name: Adarsha Pantha

//  Student ID: 2407703

const weatherIcon = document.querySelector(".image img");

// console.log(dtime);

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
// Fetching data from api
async function myweather(city) {
  try {
    const call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae4ca9856c92c4ede63a36c109a16c24&&units=metric`
    );

    if (call.status == 404) {
      const errormsg = document.querySelector(".error-message");
      errormsg.style.display = "block";
    } else {
      const data = await call.json();
      console.log(data);

      const ddate = document.querySelector(".day");
      const dtime = document.querySelector(".times");

      let unixTimestamp = data.dt;

      // Create a new Date object and multiply the timestamp by 1000
      let date = new Date(unixTimestamp * 1000);

      // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
      let dayOfWeek = date.getDay();

      // Create an array of days to map the day of the week
      let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      // Format the date as a string
      let formattedDate = date.toLocaleDateString();
      let dateComponents = formattedDate.split("/");

      // Get the weekday name based on the day of the week
      let weekday = daysOfWeek[dayOfWeek];

      const allmonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let month = allmonths[dateComponents[0] - 1];

      // inserting date and time from data
      let timestampOffset = data.timezone;
      const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
      const da = new Date(timestamp * 1000);

      const localTime = da.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
      });

      console.log(localTime);
      ddate.innerHTML = `${weekday},   ${dateComponents[1]} ${month},${dateComponents[2]}`;
      dtime.innerHTML = localTime;

      // for error city input by user
      const errormsg = document.querySelector(".error-message");
      errormsg.style.display = "none";
      document.querySelector(".city").innerHTML =
        data.name + "," + data.sys.country;
      document.querySelector(".temperature-box").innerHTML =
        Math.round(data.main.temp) + "&deg C";
      document.querySelector(".humi").innerHTML = data.main.humidity + "%";
      document.querySelector(".press").innerHTML = data.main.pressure + "hPa";
      document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";
      document.querySelector(
        ".aboutWeather"
      ).innerHTML = `${data.weather[0].description}`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
  } catch (error) {
    console.log("Error", error);
  }
}
// putting addEvenntListener in search button so when the user click the button to search it  gives respponse
searchButton.addEventListener("click", () => {
  myweather(searchBox.value);
});
// calling myWeather function
const city = "tinsukia";
myweather(city);

//  Student Name: Adarsha Pantha

//  Student ID: 2407703
