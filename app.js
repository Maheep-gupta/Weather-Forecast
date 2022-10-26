const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app =express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/inputCity.html")
})
app.post('/',(req,res)=>{
    console.log(req.body.userCity)

    // Setting Up the API
    const API_KEY="6cf263db2fe2c08e640409f24cda3dae";
    let cityName=req.body.userCity;
    const API_URL="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_KEY+"&units=metric";
    https.get(API_URL,(APIResponse)=>{
        APIResponse.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const Temperature = weatherData.main.temp


            res.send(" <h1>The Temperature of your City i.e "+cityName+" is "+Temperature+" celsius </h1> ")

        });
    });
})


app.listen(3000,()=>{
    console.log("Server Started");
})