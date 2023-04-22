const apiKey = 'VtC3Y3cqRsVUBdACrBQQFb5NIWgz5H7m'
const urlBase = 'https://dataservice.accuweather.com/'

const getCityUrl = cityName => `${urlBase}locations/v1/cities/search?apikey=${apiKey}&q="${cityName}"`

const getWeatherUrl = cityKey => `${urlBase}currentconditions/v1/${cityKey}?apikey="${apiKey}"&language=pt-BR`

const fetchData = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error('Não foi possível obter os dados')

        return response.json()
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}
const getCityData = cityName => fetchData( getCityUrl(cityName) )

const getCityWeather = cityKey => fetchData(getWeatherUrl(cityKey))