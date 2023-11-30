const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather',
        name  : 'Gajanan'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About us page',
        name  : 'Gajanan'
    })
})

app.get('/help', (req, res)=>{
    res.render('help' , {
        title: 'Help page',
        name : 'Gajanan',
        helpText : 'This is help text'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address term'
        })
    }
    
    forecast(req.query.address,  (error , data = {}) => {
        
        if(error) {
            return res.send({error})
        }
        res.send({
            location : req.query.address,
            forecast : data
            
        })
    })

})

app.get('/products', (req, res)=>{
    console.log(req.query.search)
    if (!req.query.search) {
        return res.send({
            'error' : 'you must provide serach term'
        })
    }
    res.send({
         'products' : []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404 page',
        name : 'Gajanna',
        errorMessage : 'Help article not found'     
    })
})

app.get('*', (req, res)=>{
   res.render('404', {
        title: '404 page',
        name : 'Gajanan',
        errorMessage: 'Page not found'
   })
})




app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})

