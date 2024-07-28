const request = require('request')

const geoCode = (address , callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=5c94557855c6d25b31d8eebd84427d3c&&&units=metric`;
    // console.log(url)
    request({url : url , json : true} , (error , response) => {
    if(error)
    {
        // console.log("unable to connect to weather service")
        callback('unable to connect' , undefined)
    }
    else
    {
        // console.log(+response.body.cod)
        if(+response.body.cod >= 400 && +response.body.cod < 500)
        {
            callback('unable to find location' , undefined)
        }
        else{
            const {body} = response
            const data = {
                lat : body.coord.lat,
                long :  body.coord.lon,
                country : body.sys.country,
                city : body.name
            }
            callback(undefined , data)
        }   
    }
    })
}

module.exports = geoCode
