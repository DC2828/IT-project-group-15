const apiUrl = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php";

var value = "rhrread";
var lang = "en";
const url = apiUrl+"?"+"dataType"+"="+value+"&"+"lang"+"="+lang;

var value2 = "warnsum";
const url2 = apiUrl+"?"+"dataType"+"="+value2+"&"+"lang"+"="+lang;

const url3 = apiUrl+"?"+"dataType=flw&lang"+"="+lang;

const url4 = apiUrl+"?"+"dataType=fnd&lang"+"="+lang;

var places = {'King\'s Park': 0, 'Hong Kong Observatory': 1, 'Wong Chuk Hang': 2, 'Ta Kwu Ling': 3, 'Lau Fau Shan': 4, 'Tai Po': 5, 'Sha Tin': 6, 'Tuen Mun': 7, 'Tseung Kwan O': 8, 'Sai Kung': 9, 'Cheung Chau': 10, 'Chek Lap Kok': 11, 'Tsing Yi': 12, 'Shek Kong': 13, 'Tsuen Wan Ho Koon': 14, 'Tsuen Wan Shing Mun Valley': 15, 'Hong Kong Park': 16, 'Shau Kei Wan': 17, 'Kowloon City': 18, 'Happy Valley': 19, 'Wong Tai Sin': 20, 'Stanley': 21, 'Kwun Tong': 22, 'Sham Shui Po': 23, 'Kai Tak Runway Park': 24, 'Yuen Long Park': 25, 'Tai Mei Tuk': 26};
var weatheSignalCodes = {"WFROST": 12, "WHOT": 6, "WCOLD": 10, "WFNTSA": 11, "WMSGNL": 8, "WL": 7, "WRAINA": 3, "WRAINR": 4, "WRAINB": 5, "WTMW": 13, "WTS": 9, "TC1": 14, "TC3": 15, "TC8NE": 17, "TC8SE": 16, "TC8NW": 19, "TC8SW": 18, "TC9": 20, "TC10": 21, "WFIREY": 2, "WFIRER": 1};
var specialCodes = ["WFIRE", "WRAIN", "WTCSGNL"];
var count = 0;
var selectedPlace;

// Call updateLocation() when hkplaces value changes
var hkplaces = document.getElementById("hkPlaces")
hkplaces.onchange = updateLocation;

// Call these two functions when the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadOption();
  weather();
}); 

// Save and load the chosen location
function saveOption(){
  localStorage["hkPlaces"] = hkplaces.value;
}

function loadOption(){
  if (localStorage["hkPlaces"]){
    hkplaces.value = localStorage["hkPlaces"];
    selectedPlace = hkplaces.value;
  } else {
    selectedPlace = "Hong Kong Observatory";
  }
}

/*Update location through selecting options in select element */
function updateLocation(){
  var selectedregion = document.getElementById("hkPlaces").value;
  selectedPlace = selectedregion
  saveOption()
  weather();
}


/*Basic data for the page */
function weather(){

  var choosenPlace = places[selectedPlace] // Variable for storing the location user choosen in the user interface
  var locationTemperature;
  var hkHumidity;
  var locationUvIndex;
  var weatherIconNumber;

  /* Current date and time */
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  var date = today.getDate()
  var hour = today.getHours()
  var minute = today.getMinutes()
  var time = document.getElementById("lastUpdate");
  time.value = date+"/"+month+"/"+year+" ("+hour+":"+minute+")"

  fetch(url)
    .then(response => {
      if (!response.ok){
        throw new Error("Request failed");
      } else {
        return response.json();
      }
    }) 

    .then(currentWeather => {

      /*Current Temperature*/
      const regionTemperature = currentWeather["temperature"]["data"][choosenPlace]["value"];
      locationTemperature = regionTemperature;
      var temp = document.getElementById("Temperature");
      temp.value = locationTemperature+"°C"
      
      /*Humidity*/
      const humidity = currentWeather["humidity"]["data"]["0"]["value"];
      hkHumidity = humidity;
      var humid = document.getElementById("Humidity");
      humid.value = hkHumidity+"%"

      /*UV Index*/
      const uvIndexTest = currentWeather["uvindex"];
      if (uvIndexTest != ""){
        const uvIndex = currentWeather["uvindex"]["data"]["0"]["value"];
        locationUvIndex = uvIndex;
        var uv = document.getElementById("uvIndex");
        uv.value = locationUvIndex
      }

      /*Weather Icon*/
      try{
        const icon = currentWeather["icon"]["0"];
        weatherIconNumber = icon;
        var weatherIcon = "./.vscode/images/"+weatherIconNumber+".png";
        var image = document.getElementById("weatherIcon");
        image.src = weatherIcon;
      }
      catch (error){
        console.error(error)
      }
      finally{
        if (image.src == ""){
          var image = document.getElementById("weatherIcon");
          image.src = "imagesForDesign/noIcon.png";
        }
      }
    })
    
    .catch(error => {
      console.error(error);
    });
  
  /*Weather Warning Signals*/ 
  fetch(url2)
    .then(response => {
      if (!response.ok){
        throw new Error("Request failed");
      } else {
        return response.json();
      }
    })

    .then(weatherWarnings => {
      const signalsArray = Object.keys(weatherWarnings);
      if (signalsArray != ""){
        if (count<1){
          for (i=0; i<signalsArray.length; i++){
            var code = signalsArray[i];
            if (specialCodes.includes(code)){
              const signals = weatherWarnings[signalsArray[i]]["code"];
              code = signals;
            }
            const weatherBox = document.createElement("div");
            weatherBox.style.width = "52px";
            weatherBox.style.height = "52px";
            weatherBox.style.backgroundColor = "white";
            weatherBox.style.display = "flex";
            weatherBox.style.borderRadius = "10px";
            weatherBox.style.justifyContent = "center";
            weatherBox.style.alignItems = "center";
            weatherBox.style.margin = "2px";
            const weatherImg = document.createElement("img");
            weatherImg.setAttribute("src", "weatherSignals/"+weatheSignalCodes[code]+".jpg");
            weatherImg.style.width = "45px";
            weatherImg.style.height = "45px";
            weatherImg.style.margin = "2px";
            const parent = document.getElementById("weatherWarnings");
            parent.appendChild(weatherBox);
            weatherBox.appendChild(weatherImg);
          }
          count += 1;
        }
      } else {
          if (count<1){
            const infoTextContainer = document.createElement("div");
            infoTextContainer.style.display = "flex";
            infoTextContainer.style.justifyContent = "center";
            infoTextContainer.style.alignItems = "center";
            infoTextContainer.style.width = "100%";
            const infoText = document.createElement("h3");
            infoText.style.color = "white";
            infoText.style.fontWeight = "400";
            infoText.style.fontSize = "18px";
            const textNode = document.createTextNode("No warning signals");
            infoText.appendChild(textNode);
            const parent = document.getElementById("weatherWarnings");
            parent.appendChild(infoTextContainer);
            infoTextContainer.appendChild(infoText);
            count += 1;
          }
      }
    }
    )
    .catch(error => {
      console.error(error); 
    })
}

/* Fetch Today General Situation Description*/ 
fetch(url3)
  .then(response => {
    if (!response.ok){
      throw new Error("Request failed");
    } else {
      return response.json();
    }
  })

  .then(todayGeneralSituation => {
    const todaySituation = todayGeneralSituation;
    if (todaySituation != ""){
      const situationDesc = todayGeneralSituation["forecastDesc"];
      var desc = document.getElementById("todayInfo");
      desc.innerText = situationDesc;
    }
  })

  .catch(error => {
    console.error(error);
  });

/* Open the weather description*/
function openInfo(){
  var infoBoxBtn = document.getElementsByClassName("buttonForInfo")[0];
  var infoBox = document.getElementById("additionalInfo");
  infoBoxBtn.classList.toggle("buttonForInfoActive");
  if (infoBox.style.display === "block"){
    infoBox.style.display = "none";
  }
  else{
    infoBox.style.display = "block";
  }
  if (infoBox.style.maxWidth){
    infoBox.style.maxWidth = null;
  } else{
    infoBox.style.maxWidth = "300px"
  }
}
  
/* Close the weather description*/
function openCloseForcast(){
  var openForecast = document.querySelector("#outsideContainer");
  openForecast.classList.toggle("forecastOpen");
}

/* 9-days forecast */

fetch(url4)
  .then(response => {
    if (!response.ok){
      throw new Error("Request failed");
    } else {
      return response.json();
    }
  })

  .then(forecast => {
    for (i=0; i<9; i++){
      /* Fetch Forecast Data */
      const forecastIcon = forecast["weatherForecast"][i]["ForecastIcon"];
      const forecastPsr = forecast["weatherForecast"][i]["PSR"];
      const forecastMaxrh = forecast["weatherForecast"][i]["forecastMaxrh"]["value"];
      const forecastMinrh = forecast["weatherForecast"][i]["forecastMinrh"]["value"];
      const forecastMaxtemp = forecast["weatherForecast"][i]["forecastMaxtemp"]["value"];
      const forecastMintemp = forecast["weatherForecast"][i]["forecastMintemp"]["value"];

      const forecastDate = forecast["weatherForecast"][i]["forecastDate"];
      var year = forecastDate.slice(0, 4);
      var month = forecastDate.slice(4, 6);
      var dateVar = forecastDate.slice(6, 8);
      var forecastTime = new Date(year, month-1, dateVar);
      var time = forecastTime.toDateString();
      array = time.split(" ");
      var monthName = array[1];
      day = array[0];

      /* Create Forecast Elements */
    
      /* Day Container */
      const dayContainer = document.createElement("div");
      dayContainer.style.display = "flex";
      dayContainer.style.flexDirection = "column";
      dayContainer.style.height = "500px";
      dayContainer.style.width = "160px";
      dayContainer.style.minHeight = "500px";
      dayContainer.style.minWidth = "160px";
      dayContainer.style.backgroundColor = "#222222";
      dayContainer.style.alignItems = "center";
      dayContainer.style.gap = "10px";
      dayContainer.style.position = "absolute";
      dayContainer.style.left = i * 170 + "px";
      dayContainer.setAttribute("id", "dayContainer")
      const insideContainer = document.getElementById("insideContainer");
      insideContainer.appendChild(dayContainer);

      /* Date */
      const date = document.createElement("h2");
      date.style.marginTop = "19px";
      date.style.color = "white";
      date.style.textAlign = "center";
      const dateText = document.createTextNode(dateVar+" "+monthName);
      const breakLine = document.createElement("br");
      const dayText = document.createTextNode("("+day+")")
      date.appendChild(dateText);
      date.appendChild(breakLine);
      date.appendChild(dayText);
      dayContainer.appendChild(date);

      /* Day Weather Icon */
      const weatherForecastIcon = document.createElement("img");
      weatherForecastIcon.setAttribute("src", ".vscode/images/"+forecastIcon+".png");
      weatherForecastIcon.style.width = "110px";
      weatherForecastIcon.style.height = "110px";
      dayContainer.appendChild(weatherForecastIcon);

      /* Day Temperature Range */
      const dayTempRange = document.createElement("h3");
      dayTempRange.style.color = "#fff";
      dayTempRange.style.fontSize = "22px";
      dayTempRange.style.fontWeight = "400";
      const tempRangeText = document.createTextNode(forecastMintemp+"-"+forecastMaxtemp+"°C");
      dayTempRange.appendChild(tempRangeText);
      dayContainer.appendChild(dayTempRange);

      /* Day Humidity Range */
      const dayHumidRange = document.createElement("h3");
      dayHumidRange.style.color = "#fff";
      dayHumidRange.style.fontSize = "22px";
      dayHumidRange.style.fontWeight = "400";
      const humidRangeText = document.createTextNode(forecastMinrh+"-"+forecastMaxrh+"%");
      dayHumidRange.appendChild(humidRangeText);
      dayContainer.appendChild(dayHumidRange);

      /* Div for rainfall probability range */
      const insideRow = document.createElement("div");
      insideRow.style.marginTop = "10px";
      insideRow.style.display = "flex";
      insideRow.style.alignItems = "center";
      insideRow.style.gap = "9px";
      insideRow.style.borderTop = "solid";
      insideRow.style.borderColor = "#343434";
      insideRow.style.paddingTop = "15px";
      insideRow.style.borderWidth = "3px";
      insideRow.style.width = "100%";
      insideRow.style.justifyContent = "center";
      dayContainer.appendChild(insideRow);

      /* Day rainfall probability */
      const rainfallImg = document.createElement("img");
      rainfallImg.setAttribute("src", "imagesForDesign/psr.png")
      rainfallImg.style.height = "50px";
      rainfallImg.style.width = "50px";
      insideRow.appendChild(rainfallImg);

      const dayPsr = document.createElement("h4");
      dayPsr.style.color = "#fff";
      dayPsr.style.fontWeight = "300";
      const dayPsrText = document.createTextNode("PSR");
      dayPsr.appendChild(dayPsrText);
      insideRow.appendChild(dayPsr);

      const rainfallLevel = document.createElement("h3");
      rainfallLevel.style.color = "#fff";
      rainfallLevel.style.fontSize = "22px";
      rainfallLevel.style.fontWeight = "400";
      const dayPsrLevelText = document.createTextNode(forecastPsr);
      rainfallLevel.appendChild(dayPsrLevelText);
      dayContainer.appendChild(rainfallLevel);
    }
  })

  .catch(error => {
    console.error(error);
  });


window.onload = dateDisplay()
