const $formCitySearch = document.querySelector('.search-form')
const $img = document.querySelector('.card-weather img')
const $icon = document.querySelector('[data-js="icon-weather"]')
const $cityName = document.querySelector('[data-js="city-name"]')
const $cityWeather = document.querySelector('[data-js="city-weather"]')
const $cityTemperature = document.querySelector('[data-js="city-temperature"] > span')

$formCitySearch.addEventListener('submit', async event => {
    event.preventDefault()
    const { target } = event
    const inputValue = target.citysearch.value

    const { LocalizedName, Key } = await getCity(inputValue)
    const {
        IsDayTime, Temperature, WeatherIcon, WeatherText
    } = await getCityWeather(Key)

    $img.src = `src/${IsDayTime ? 'day' : 'night'}.svg`
    $img.alt = WeatherText

    $icon.src = `src/icons/${WeatherIcon}.svg`

    $cityWeather.textContent = WeatherText
    $cityName.textContent = LocalizedName
    $cityTemperature.textContent = Temperature.Metric.Value
})