// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//             console.log(data);
//     })
// })

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const location=search.value;

    messageOne.textContent='Loading.....'
    messageTwo.textContent='';
    
    fetch('/weather?address='+ encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log('Error:',data.error);
            messageOne.textContent=data.error;
        }else{
            console.log(data.forecast);
            console.log(data.location);
            messageOne.textContent=data.forecast;
            messageTwo.textContent=data.location;
        }
    })
})
})

