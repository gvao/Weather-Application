const apiKey = '3877vB4OwT5MrAbvOZU5D5avrwe9U0AV'
const urlBase = 'http://dataservice.accuweather.com/'

const getUrlSearchCity = query => `${urlBase}locations/v1/cities/search?language=pt-BR&apikey=${apiKey}&q=${query}`
const getUrlWeather = cityCod => `${urlBase}currentconditions/v1/${cityCod}?language=pt-BR&apikey=${apiKey}`

const getCity = async (cityName) => {
    const [city] = await fetcher(getUrlSearchCity(cityName))
    return city
}

const getCityWeather = async (cityCod) => {
    const [ weather ] = await fetcher(getUrlWeather(cityCod))
    return weather
}

async function fetcher(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) throw new Error('Não foi possível obter os dados')

        return await response.json()

    } catch (err) {
        console.log(`[getCity]`, err)
    }
}
