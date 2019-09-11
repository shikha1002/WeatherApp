const path=require('path');
const express= require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast= require('./utils/forecast');

// console.log(__dirname); // __dirname will give us the path where the current file is present
// console.log(__filename); // __filename will give us the path including filename

const app=express()



//Define paths for Express config
const publicPathDirectry=path.join(__dirname,'../Public');
const viewPath=path.join(__dirname,'../Templates/views');
const partialPath=path.join(__dirname,'../Templates/partials');

//Set up handlebar engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);

//setup handlebar partial
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicPathDirectry));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shikha'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Shikha'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help other people',
        title:'Help',
        name:'shikha'
    });
})
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'shikha',
//         age:'14',
//         location: 'bangalore'
//     },{
//         name:'jay',
//         age:'34',
//         location: 'Katihar'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>');
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
           return res.send({error});
        }

        //---------------forecast to take longitude and latitude and give temperature result------------
        forecast(latitude,longitude, (error, forecastData) => {
           if(error){
              return res.send({error});
           }
           //console.log('Error', error)
                res.send({
                    forecast:forecastData,
                    location:location,
                    address:req.query.address
                });
        }) 
        //-----------------------------forecast end---------------
        
     }) 
     //-------------geocode end-----------------
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         product:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    // res.send('This help artical doesn\'t exist' );
    res.render('404',{
        Errormessage:'This Helper page is not exist'
    })
})

app.get('*',(req,res)=>{
    // res.send('This Page is not Found');
    res.render('404',{
        Errormessage:'404 Error Page'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running');
})
