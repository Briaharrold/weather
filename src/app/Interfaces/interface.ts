export interface ICurrentWeather {
    coord: {
        lon: number
        lat: number
    },
    weather: [{
        id: number,
        main: string,
        description: string,
        icon: string
}],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grind_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface I5DayForecast {
    cod: string,
    message: number,
    cnt: number,
    list: any
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

export interface ICity {
    country: string
    lat: number
    local_names?: {}
    lon: number
    name: string
    state: string
}