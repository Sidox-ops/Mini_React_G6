import { MiniReact } from "../MiniReact.js";
import Hello from "./Hello.js";
import Header from "./Header.js";
import { type_check } from "../utils.js";

const city = "Paris";
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

export default class Meteo extends MiniReact.Component {
  async getMeteo() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=1060660ff1647422b673c356873669f7&units=metric`
    );
    const myJson = await response.json();
    return myJson;
  }

  async render() {
    document.title = "La météo de gulli";
    const meteoJson = await this.getMeteo();
    var date = new Date(meteoJson.dt * 1000);
    var minutes = date.getMinutes() == "0" ? " " : date.getMinutes();
    var temperature = meteoJson.prop_access("main.temp");
    var humidity = meteoJson.prop_access("main.humidity");

    var weather = meteoJson.weather;

    // In the meteo object, check property wind speed is a number
    var windSpeed = "Inconnu";
    if (type_check(meteoJson.wind, { type: 'object', properties: {speed: {type: 'number'}} })) {
      windSpeed = meteoJson.prop_access("wind.speed")
      windSpeed = `${windSpeed}km/h`;
    }

    if (weather[0].description == "couvert") {
      var classIcon = "fas fa-cloud-showers-heavy";
    }

    return MiniReact.createElement(Hello, { id: "hello" }, [
      MiniReact.createElement("div", { class: "container" }, [
        MiniReact.createElement("h1", null, ["METEO"]),
        MiniReact.createElement("h2", null, [
          city + " ",
          MiniReact.createElement("i", { class: classIcon }, []),
        ]),

        MiniReact.createElement("div", null, [
          MiniReact.createElement("span", null, [
            "Date : " +
              date.getDate() +
              " " +
              months[date.getMonth()] +
              " " +
              date.getFullYear(),
          ]),
          MiniReact.createElement("span", null, [
            " | " + date.getHours() + "H " + minutes,
          ]),
          MiniReact.createElement("ul", null, [
            MiniReact.createElement("li", null, [
              MiniReact.createElement("p", null, [
                "Température : " + temperature + "°",
              ]),
            ]),
            MiniReact.createElement("li", null, [
              MiniReact.createElement("p", null, [
                "Humidité : " + humidity + "%",
              ]),
            ]),
            MiniReact.createElement("li", null, [
              MiniReact.createElement("p", null, [
                "Vision : " + weather[0].description,
              ]),
            ]),
            MiniReact.createElement("li", null, [
              MiniReact.createElement("p", null, [
                "Vent (vitesse) : " + windSpeed,
              ]),
            ]),
          ]),
        ]),
      ]),
    ]);
  }
}
