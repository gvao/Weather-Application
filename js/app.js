import { Emitter } from "./emitter.js"
import { WeatherApp } from "./weather.js"

const form = document.querySelector('.search-form')

const $card = document.querySelector('.card-weather')
const $img = document.querySelector('[data-js="icon-weather"]')
const $icon = document.querySelector('[data-js="icon-weather"]')
const $cityName = document.querySelector('[data-js="city-name"]')
const $cityWeather = document.querySelector('[data-js="city-weather"]')
const $cityTemperature = document.querySelector('[data-js="city-temperature"] > span')

const updateScreen = ({ IsDayTime, WeatherIcon, WeatherText, LocalizedName, Temperature }) => {
    const cardClasses = $card.classList

    cardClasses.remove('hidden')

    $img.src = `src/${IsDayTime ? 'day' : 'night'}.svg`
    $img.alt = WeatherText

    $icon.src = `src/icons/${WeatherIcon}.svg`

    $cityWeather.textContent = WeatherText
    $cityName.textContent = LocalizedName
    $cityTemperature.textContent = Temperature
}

const getRequestWeatherApi = async cityName => {
    const { LocalizedName, Key } = await WeatherApp.getCity(cityName)
    const {
        IsDayTime, Temperature, WeatherIcon, WeatherText,
    } = await WeatherApp.getCityWeather(Key)

    Emitter.emit(`dataUpdate`, {
        IsDayTime, WeatherIcon, WeatherText, LocalizedName, Temperature: Temperature.Metric.Value
    })
}

function onSubmit(event) {
    event.preventDefault()

    const input = form.citysearch

    getRequestWeatherApi(input.value)
}

Emitter.on("dataUpdate", updateScreen)
form.addEventListener('submit', onSubmit)