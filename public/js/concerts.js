let concertSelected='';//global variable to know what recipe is selected
let concertIds=[];

function addConcert(){
    $("#form-concerts").empty();
    let strHtml = 
    "<form class = 'form' > " +
    "<label for='cname'>Concert: </label>" +
    "<input type='text'><br>" +
    "<label for='clocation'>Location: </label>" +
    "<input type='text'><br></br>" +
    "<input id='concert-id' type='hidden' value=''/>"+
    "<button type='button' class='btn' onclick ='submitConcert()' >Submit</button>"+
    "</form>"
    $("#form-concerts").append(strHtml);
}

//saving the concert that was submitted via API
function submitConcert() {
    var jsonToAdd = getFields();
    let obj = JSON.parse(jsonToAdd)
    console.log(jsonToAdd)

    
    if(jsonToAdd == null){
        alert("Fill all the fields");
        return;
    }
    
    let newId = '';
    
    fetch(apiURL,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(obj)
    }).then(response => response.json()) 
    .then(json => {
        console.log(json)
        newId =json._id ;
    })
    .catch(err => console.log(err));
    
    
    getNames(); //getTitles
    $("#form-concerts").empty();
    concertSelected='';
    
}

// take all the information and parses it to a JSON Format
function getFields(){

    var location = document.getElementById("clocation").value;
    var concertName = document.getElementById("cname").value.trim();

    
    var strJSON = '{'+
        
        '"Concert":"' + concertName ;


    if(strJSON.endsWith(',')){
        strJSON = strJSON.slice(0,strJSON.length -1);
    }

    strJSON+='],'+
        '"location":"'+location+'"}';


        //null if there is any field empty
    if(concertName == '' ||location == ''){  
        return null;
    }
    else{
        console.log(strJSON);
        return strJSON.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
        
    }

}


