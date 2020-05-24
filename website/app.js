// Personal API Key for OpenWeatherMap API
const apikey = "49b9b809e566d9d0cb35f31930cdff2e";
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',  async function (e) {
    const feelings = document.getElementById('feelings').value;
    const response = await getResponseFromAPI();
    try {
        const data = {
            temperature: response.main.temp,
            date: newDate,
            feelings: feelings
        };
        await postData("http://localhost:8080/addData",data);
        updateUI();
    }
    catch (e) {
        console.log('error',e);
    }

});
/* Function called by event listener */

/* Function to GET Web API Data*/
async function getResponseFromAPI() {
    const pincode = document.getElementById('zip').value;
    const response = await fetch(`${baseURL}zip=${pincode},IN&appid=${apikey}`);
    try{
        return await response.json();
    }
    catch (e) {
        console.log('error',e);
    }
}

async function postData(url,data){
    const response = await fetch(url,{
        method : "POST",
        credentials : "same-origin",
        headers : {
            'Content-Type' : 'application/JSON',
        },
        body : JSON.stringify(data)
    });

}

async function updateUI(){
    const response = await fetch('http://localhost:8080/all');
    const data = await response.json();
    const date = document.getElementById('date');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');
    date.innerHTML = "Date: " + data.date;
    temp.innerHTML  = "Temperature: " + parseInt(data.temperature) + `\u2103`;
    content.innerHTML = "Your feelings: "+ data.feelings;
}