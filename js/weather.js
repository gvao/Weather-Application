async function fetcher(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error('Não foi possível obter os dados')

        return await response.json()
    } catch (err) {
        console.error(`[fetcher]`, err)
    }
}

export const WeatherApp = (() => {
    const apiKey = '3877vB4OwT5MrAbvOZU5D5avrwe9U0AV'
    const urlBase = 'https://dataservice.accuweather.com/'

    const getUrlSearchCity = query => `${urlBase}locations/v1/cities/search?language=pt-BR&apikey=${apiKey}&q=${query}`
    const getUrlWeather = cityCode => `${urlBase}currentconditions/v1/${cityCode}?language=pt-BR&apikey=${apiKey}`

    return {

        async getCity(cityName) {
            const [city] = await fetcher(getUrlSearchCity(cityName))
            return city
        },

        async getCityWeather(cityCode) {
            const [weather] = await fetcher(getUrlWeather(cityCode))
            return weather
        },

    }
})()