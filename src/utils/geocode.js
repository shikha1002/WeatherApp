const request=require('request');

const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hpa2hhMTAwMiIsImEiOiJjanhweW93bjEwNmt3M2RvOHV4MjZvN2UwIn0.HXy0QRl1MWpqIBvbWF29zg&limit=1';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback(error,undefined);
        }else if(body.features.length===0){
            callback('entered location is not correct',undefined);
        }else{
            const data1=body;
            // console.log("longitude: "+data1.features[0].center[0]);
            // console.log("latitude: "+data1.features[0].center[1]);
            callback(undefined,{
                longitude: data1.features[0].center[0],
                latitude: data1.features[0].center[1],
                location: data1.features[0].place_name
            })
        }
    });

}

module.exports=geocode;
       
