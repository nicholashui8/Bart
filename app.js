//const apiURL = 'https://api.bart.gov/api/sched.aspx?cmd=fare&orig=sfia&dest=pitt&key=MW9S-E7SL-26DU-VV8V&json=y'


//function calls the API
//pass the function "output()", so that we can print out data
async function getData(output){
    
    let a  = document.getElementById("orgin-select")
    let orginAbbrev = a.options[a.selectedIndex].value;
    let b = document.getElementById("destination-select")
    let desinationAbbrev = b.options[b.selectedIndex].value;

    const begin ='https://api.bart.gov/api/sched.aspx?cmd=fare&orig=';
    let orgin = orginAbbrev;
    let destination = desinationAbbrev;
    let middle = '&dest=';
    let end= '&key=MW9S-E7SL-26DU-VV8V&json=y';
    let apiURL = begin + orgin + middle + destination + end;
    
    //if user chooses the same orgin and destination, send alert and do not call output()
    if(orginAbbrev == desinationAbbrev){
        alert("Error! Orgin and destination must be different!");
    }
    else{
        //prints out the APIURL
        console.log(apiURL);
        //get the api
        const response = await fetch(apiURL);
        //read and parse data with .json()
        const data = await response.json();
        //console.log(data);

        //calls function to put data
        output(data);
    }
} 

//this function outputs the fare 
function output(data){
    //seaches through html for right id, changes the value based on the data from api
    //"data.root.fares.fare[]["amount"]" is from the JSON file
    document.getElementById('clipper-fare').textContent = data.root.fares.fare[0]["@amount"];
    document.getElementById('cash-fare').textContent = data.root.fares.fare[1]["@amount"];
    document.getElementById('senior-fare').textContent = data.root.fares.fare[2]["@amount"];
    document.getElementById('youth-fare').textContent = data.root.fares.fare[3]["@amount"];

}


//changes fare when user selects "calculate cost" button,
//use arrow function to call getData
document.getElementById('submit-button').addEventListener("click", () => {
    getData(output);
});
 