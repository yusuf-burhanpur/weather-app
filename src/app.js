const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

 const app = express()
 const port = process.env.PORT || 3000
 // define path for express config
 const viewspath = path.join(__dirname, '../viewspath/views')
 const partialpath = path.join(__dirname, '../viewspath/partials')
app.use(express.static(path.join(__dirname , '../public')))

// setup handlebars engine and views loation
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

// setup static directory to serve
app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather',
        name:'yusuf mustafa'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'about me',
        name:'yusuf mustafa'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'contact us',
       name: 'yusuf mustafa'
    })
})
app.get('/help/*', (req, res) =>{
    res.render('404-page',{
        title:'404 error',
        error: 'Help article not found',
        name: 'Yusuf Mustafa'
    })
})



app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error:'please provide the address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = { } )=>{
        if(error){
            return res.send({ error : 'please provide address'})
        }
        forecast(latitude, longitude, (error, forecastedData)=>{
            if(error){
                return res.send({error : 'please provide proper coordinates'})
            }
                res.send({
                    location,
                    forecast: forecastedData,
                    address:req.query.address
                })
        })

        })
    
})

    // res.send({
    //     location: 'indore',
    //     temperature: 15.7,
    //     address: req.query.address
    // })



app.get('*', (req,res) =>{
    res.render('404-page',{
        title:'404 error',
        error: 'page not found',
        name: 'Yusuf Mustafa'
    })
})

app.listen(port, ()=>{
    console.log('server is up with port' + port)
})