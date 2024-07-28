const path = require('path')
const express = require('express');
const hbs = require('hbs');
const { title } = require('process');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express();
const viewspath = path.join(__dirname , '/templates/views')
const partialspath = path.join(__dirname , '/templates/partials')

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine' , 'hbs')
app.set('views' , viewspath) 
hbs.registerPartials(partialspath);

app.get('' , (req , res) => {
    res.render('index' , {
        title : 'Weather App',
        name : "zuma beeh"
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title : 'About',
        name : "zuma beeh",
        age : 20
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        name : "zuma beeh",
        title : 'Help',
        helptext : 'contact me at my Email for help: '
    } )
})

app.get('/weather' , (req ,res) => {
    if(!req.query.address)
    {
        return res.send({
            error : "Address must be provided"
        })
    }

    geoCode(req.query.address , (error , {lat , long , country ,city} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast( long , lat ,(error , forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            console.log('Data: ' + forecastData)
            console.log(country)
            res.send({
                forecast : forecastData,
                location : country,
                address : req.query.address,
                city : city
            })
        })
    })

    // res.send({
    //     forecast : `the temprature is 20`,
    //     location : "EG",
    //     address : req.query.address
    // })
})

app.get('/products' , (req , res) => {
    if(!req.query.search) {
        return res.send({
            error : "search term must be provided"
        })
    } 
    console.log(req.query.search)
    res.send({ 
        products : []
    })
})

app.get('/help/*' , (req ,res) => {
    res.render('404' , {
        name : "zuma beeh",
        msg : "help article not found",
        title : 404
    })
})

app.get('*' , (req ,res) => {
    res.render('404' , {
        name : "zuma beeh",
        msg : "page not found",
        title : 404
    })
})

app.listen(3000 , () =>{
    console.log("server is up on port 3000")
});


// app.use(express.static(path.join(__dirname, '../public/index')))

// app.get('' , (req , res) => {
//     res.send('<h1>hello express</h1>') // meaningless now
// } )

// app.get('/help' , (req ,res) => {
//     res.send({
//         name : 'Zuma beeh', 
//         age : 20    
//     })
// })

// app.get('/about' , (req,res) =>{
//     res.send('afhjebjlkfe')
// })