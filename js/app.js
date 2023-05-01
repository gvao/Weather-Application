const $formCitySearch = document.querySelector('.search-form')

const $card = document.querySelector('.card-weather')
const $img = document.querySelector('[data-js="icon-weather"]')
const $icon = document.querySelector('[data-js="icon-weather"]')
const $cityName = document.querySelector('[data-js="city-name"]')
const $cityWeather = document.querySelector('[data-js="city-weather"]')
const $cityTemperature = document.querySelector('[data-js="city-temperature"] > span')

const lastCitySearch = localStorage.getItem('lastCity')



const updateScreen = ({ IsDayTime, WeatherIcon, WeatherText, LocalizedName, Temperature }) => {

    const cardClasses = $card.classList
    cardClasses.contains('hidden') && cardClasses.remove('hidden')

    $img.src = `src/${IsDayTime ? 'day' : 'night'}.svg`
    $img.alt = WeatherText

    $icon.src = `src/icons/${WeatherIcon}.svg`

    $cityWeather.textContent = WeatherText
    $cityName.textContent = LocalizedName
    $cityTemperature.textContent = Temperature
}

const getRequestApi = async inputValue => {
    const { LocalizedName, Key } = await getCity(inputValue)
    const {
        IsDayTime, Temperature, WeatherIcon, WeatherText
    } = await getCityWeather(Key)

    updateScreen({
        IsDayTime, WeatherIcon, WeatherText, LocalizedName, Temperature: Temperature.Metric.Value
    })
}

const handlerSubmit = event => {
    event.preventDefault()
    const { target } = event
    const inputValue = target.citysearch.value

    localStorage.setItem('lastCity', inputValue)

    getRequestApi(inputValue)

    target.reset()
}

if (lastCitySearch) {
    console.log('tem localStorage')
    $formCitySearch.citysearch.value = lastCitySearch
    getRequestApi(lastCitySearch)
}

$formCitySearch.addEventListener('submit', handlerSubmit)