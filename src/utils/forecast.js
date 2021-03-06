const request=require('request');

const forecast=(longitude,latitude,callback)=>{
    const url='https://api.darksky.net/forecast/ed0352f5ecdc9b9f1b83d7ec0f452379/'+ longitude+ ','+latitude ;
     request({url,json:true},(error,{body})=>{
        if(error){
            callback(error,undefined);
        }else if(body.error){
            callback('Unable to find the location',undefined);
        }else{
            const celsiousTemperature=Math.floor((body.currently.temperature-32)* 5/9);
            const celsiousTemperatureLow=Math.floor((body.daily.data[0].temperatureLow-32)* 5/9);
            const celsiousTemperatureHigh=Math.floor((body.daily.data[0].temperatureHigh-32)* 5/9);

            callback(undefined,`It is currently ${celsiousTemperature} degresss out.
             There is ${body.currently.precipProbability} % change of raining.
             \u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020
             Temperature Low: ${celsiousTemperatureLow} degree
             \u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020
             \u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020
             \u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020\u0020\u00A0\u00A0\u00A0\u0020\u00A0\u00A0\u00A0\u0020
             Temperature High: ${celsiousTemperatureHigh} degree`);
        }
     })
};

module.exports=forecast;

// const forecast=(longitude,latitude,callback)=>{
//     const url='https://api.darksky.net/forecast/ed0352f5ecdc9b9f1b83d7ec0f452379/'+ longitude+ ','+latitude ;
//      request({url:url,json:true},(error,response)=>{
//         if(error){
//             callback(error,undefined);
//         }else if(response.body.error){
//             callback('Unable to find the location',undefined);
//         }else{
//             callback(undefined,`It is currently ${response.body.currently.temperature} degresss out.There is ${response.body.currently.precipProbability} % change of raining`);
//         }
//      })
// };