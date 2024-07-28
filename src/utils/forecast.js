const request = require('request')

const forecast = (long , lat , callback) => {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`    

    request({ url : url , json:true  } , (error , response) => 
        {
            if(error) {
                callback('unable to connect to weather service' , undefined)
            }   
            else if(response.body.error){
                // console.log('Unabel to find location')
                callback('Unabel to find location' , undefined)

            }   
            else{
                const {body} = response
                // console.log("The Temp is: " + response.body.current.temperature_2m   )
                callback(undefined , body.current.temperature_2m)
            }   
        } 
    )
        
}

module.exports = forecast