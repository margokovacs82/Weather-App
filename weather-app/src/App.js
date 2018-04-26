import React, { Component } from 'react';
import './App.css';
import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "d9f86d61e7b0ced561695429c61104c2";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWether = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&${country}&APPID=${API_KEY}`);
    const data = await api_call.json();

    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.list["0"].main.temp,
        humidity: data.list["0"].main.humidity,
        city: data.city.name,
        country: data.city.country,
        description: data.list["0"].weather["0"].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        humidity: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        error: "Please enter the values!"
      }
      )
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className ="col-xs-5 title-container">
                <Titles />
                </div>
                <div className ="col-xs-7 title-container">
                <Form getWeather={this.getWether} />
                <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


export default App;
