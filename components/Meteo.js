import {MiniReact} from "../MiniReact.js";
import {Hello} from "./Hello.js";
import {Header} from "./Header.js";

const city = 'Paris';
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

export class Meteo extends MiniReact.Component {

    async getMeteo() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=1060660ff1647422b673c356873669f7&units=metric`)
        const myJson = await response.json();
        return myJson;
    }

     async render() {
         const meteoJson = await this.getMeteo();
         var date = new Date(meteoJson.dt * 1000);
         var minutes = date.getMinutes() == '0' ? ' ' : date.getMinutes()
         var main = meteoJson.main;
         var weather = meteoJson.weather;
         var wind = meteoJson.wind;
         if( weather[0].description =="couvert"){
             var classIcon = 'fas fa-cloud-showers-heavy';
         }

        return MiniReact.createElement(Hello, {id: "hello"}, [
            MiniReact.createElement("div", {class:'container'}, [
                MiniReact.createElement("h1",null, ["METEO"]),
                MiniReact.createElement("h2", null, [city +" ", MiniReact.createElement("i", {class:classIcon}, []),]),

                MiniReact.createElement("div", null, [
                MiniReact.createElement("span", null, ['Date : ' + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()]),
                MiniReact.createElement("span", null, [" | " + date.getHours() + "H " + minutes]),
                MiniReact.createElement("ul", null, [
                    MiniReact.createElement("li", null, [
                        MiniReact.createElement("p", null, ['Température : ' + main.temp + '°']),
                    ]),
                    MiniReact.createElement("li", null, [
                        MiniReact.createElement("p", null, ['Humidité : ' + main.humidity + '%']),
                    ]),
                    MiniReact.createElement("li", null, [
                        MiniReact.createElement("p", null, ['Vision : ' + weather[0].description]),
                    ]),
                    MiniReact.createElement("li", null, [
                        MiniReact.createElement("p", null, ['Vent (vitesse) : ' + wind.speed + "km/h"]),
                    ]),
               ]),
            ]),
            ]),
        ]);
    }


}