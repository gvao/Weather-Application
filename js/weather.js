const apiKey = 'ecty8AvHgalDkfNaqxIKzoyQKNqYL1Zx'
const urlBase = 'http://dataservice.accuweather.com/'

const api = getUrlApi(apiKey)

const getCity = async (cityName) => {
    
    const urlSearchCity = api.getUrlSearchCity(cityName)

    const [ city ] = await fetch(urlSearchCity)
        .then(res => res.json())
        .catch(console.error)

    return city
}

const getCityWeather = async (cityCod) => {
    
    const urlWeather = api.getUrlWeather(cityCod)

    const [ currentConditions ] = await fetch(urlWeather)
        .then(res => res.json())
        .catch(console.error)

    return currentConditions
}

function getUrlApi (apiKey) {

    const getUrlSearchCity = query => `${urlBase}locations/v1/cities/search?apikey=${apiKey}&q=${query}`

    const getUrlWeather = cityCod => `${urlBase}currentconditions/v1/${cityCod}?apikey=${apiKey}`

    return {
        getUrlSearchCity,
        getUrlWeather
    }
}