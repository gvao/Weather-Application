const apiKey = 'VtC3Y3cqRsVUBdACrBQQFb5NIWgz5H7m'

const getCityUrl = cityName => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`

const getCityWeatherUrl = key => `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}&language=pt-BR`

const fetchWeatherApi = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error('Não foi possível obter os dados')

        const [data] = await response.json()
        return data
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}

const getCityData = async cityName => {
    const cityUrl = getCityUrl(cityName)

    return await fetchWeatherApi(cityUrl)
}

const getCityWeather = async cityName => {
    const { Key } = await getCityData(cityName)
    const cityWeatherUrl = getCityWeatherUrl(Key)

    return await fetchWeatherApi(cityWeatherUrl)
}

getCityWeather('rio de janeiro')
    // .then(console.log)
