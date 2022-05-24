let concertSelected='';// variable to see the concert selected
let concertIds=[];
let apiURL = "https://iwa-ca2-version15.herokuapp.com/concerts"

function addConcert(){
    $("#form-concerts").empty();
    let strHtml = 
    "<form class = 'form' > " +
    "<label for='cname'>Concert: </label>" +
    "<input type='text' id='concert-name'><br>" +
    "<label for='clocation'>Location: </label>" +
    "<input type='text' id = 'concertLocation'><br></br>" +
    "<input id='concert-id' type='hidden' value=''/>"+
    "<button type='button' class='btn' onclick ='submitConcert()' >Submit</button>"+
    "</form>"
    $("#form-concerts").append(strHtml);
}


// edit concert selected 
function editConcert(){
    if(!concertSelected == ''){
        $("#form-concerts").empty();
        
        
            let url = apiURL + concertSelected;
        
        fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(concert){
        
            console.log(concert);

            let strHtml =  "<form class = 'form' > "+
                "<label for='cname'>Concert: </label>"+
                "<input type='text' id='concert-name' value = '"+concert.name+"'>";
                
            strHtml += 
                "<label for='clocation'>Location: </label>"+
                "<input type='text' id = 'concertLocation' >"+concert.location.replace(/\\n/g, "\n")+
                "<input id='concert-id' type='hidden' value='" + concert.id  + "'/>"+
                "<button type='button' class='btn' onclick ='updateConcert()' >Update concert</button>"
                "</form>";
            $("#form-concerts").append(strHtml);

        }).catch(function (err){
            console.log(err);
        }); 
    }else{
        alert("You did not select a concert")
    }

};

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
    
    getConcertNames(); 
    $("#form-concerts").empty();
    concertSelected='';
    
}

// take all the information and parses it to a JSON Format
function getFields(){

    var location = document.getElementById("concertLocation").value;
    var name = document.getElementById("concert-name").value.trim();

    
    var strJSON = '{'+
        
        '"Concert":"' + name ;


    if(strJSON.endsWith(',')){
        strJSON = strJSON.slice(0,strJSON.length -1);
    }

    strJSON+='],'+
        '"location":"'+location+'"}';


        //null if there is any field empty
    if(name == '' ||location == ''){  
        return null;
    }
    else{
        console.log(strJSON);
        return strJSON.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
        
    }

}

// show my concerts in the main page
function showConcert(concertId){
    
    let url = apiURL + concertId;
    
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function(concert){
    
        let strHtml = "<h1>"+concert.name+"</h1>"

        strHtml+="<h2>Location: </h2>"+
            "<p>"+ concert.location.replace(/\\n/g, "<br />"); +"</p>"

        $("#concert-form").append(strHtml);

    }).catch(function (err){
        console.log(err);
    }); 

};


//show off concerts 
function checkConcert(concertIds){
    $("#form-concerts").empty();
    showConcert(concertIds);
    concertSelected = concertIds;
};



// search for concerts in the API and put it on "my-concerts"
function getConcertNames(){
    
    fetch(apiURL)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        for (var i = 0; i< data.length ; i++ ){
            var id = data[i]._id;
            if(!concertIds.includes(id)){
            document.getElementById("my-concerts").innerHTML +=
            "<h2 id='artists"+id+"' onclick= \"checkConcert('"+id+"')\">" + data[i].name+"</h2>"
            concertIds.push(id);
            }
        
        }
    }).catch(function (err){
        console.log(err);
    }); 
    console.log(concertIds);

};

//when document ready get concert names that are there.
$(document).ready(function(){
    getConcertNames();
});

function updatePage(){
    $("#form-concerts").html("");
    getConcertNames();
}

//delete a concert
function delConcert(){


    if(!concertSelected == ''){
        if(confirm("Are you sure you want to DELETE this concert ?")){
    
            fetch(apiURL+concertSelected,{
                method: 'delete',
            }).then(response => response.json()) 
            .then(json => {
                console.log(json)
                newID =json._id ;
            })
            .catch(err => console.log(err));
            
            
            document.getElementById("artists"+concertSelected).remove();
            
            concertIds.splice(concertIds.indexOf(concertSelected));
            $("#form-concerts").empty();
            concertSelected ='';
            }
    
    }
    else{
        alert("You did not choose a concert")
    }
    
};

//update the edited concert
function updateConcert(){
    var jsonToAdd = getFields();
    console.log(jsonToAdd);
    let obj = JSON.parse(jsonToAdd)
    console.log(jsonToAdd)

    
    if(jsonToAdd == null){
        alert("Fill all the fields");
        return;
    }
    
    
    
    fetch(apiURL+concertSelected,{
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(obj)
    }).then(response => response.json()) 
    .then(json =>{
        console.log(json);
        document.getElementById("artists"+concertSelected).innerHTML = json.name ;
    }).catch(err => console.log(err));
    checkConcert(concertSelected);
    
}




