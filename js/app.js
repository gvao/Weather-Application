const $formCitySearch = document.querySelector('.search-form')
const $img = document.querySelector('.card-weather img')
const $icon = document.querySelector( '[data-js="icon-weather"]')

$formCitySearch.addEventListener('submit', async event => {
    event.preventDefault()
    const { target } = event
    const inputValue = target.citysearch.value

    const city = await getCity(inputValue)
    const { IsDayTime, Temperature, WeatherIcon, WeatherText } = await getCityWeather(city.Key)

    $img.src = `src/${ IsDayTime ? 'day' : 'night' }.svg`
    $img.alt = WeatherText
})