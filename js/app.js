const cityForm = document.querySelector('[data-js="change-location"]')

const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]')

const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const showCityCard = () => {
    if (!cityCard.classList.contains('d-none')) return
    cityCard.classList.remove('d-none')
}

const insertTimeIcon = ({ WeatherIcon, WeatherText }) => {
    const timeIcon = `<img src="src/icons/${WeatherIcon}.svg" alt="${WeatherText}" />`
    timeIconContainer.innerHTML = timeIcon
}

const insertIcons = ({ WeatherIcon, WeatherText, IsDayTime }) => {
    timeImg.src = `src/${IsDayTime ? 'day' : 'night'}.svg`
    
    insertTimeIcon({ WeatherIcon, WeatherText })
}

const updateContents = ( LocalizedName, WeatherText, Temperature ) => {
    cityNameContainer.textContent = LocalizedName
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature
}

const showCityWeatherInfo = async inputValue => {
    const [{ Key, LocalizedName }] = await getCityData(inputValue)
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)

    insertIcons({ WeatherIcon, WeatherText, IsDayTime })
    updateContents(LocalizedName, WeatherText, Temperature.Metric.Value)
}

const handlerSubmit = event => {
    const { target } = event
    event.preventDefault()

    const inputValue = target.city.value
    
    showCityCard()
    showCityWeatherInfo(inputValue)
    target.reset()
}

cityForm.addEventListener('submit', handlerSubmit)
