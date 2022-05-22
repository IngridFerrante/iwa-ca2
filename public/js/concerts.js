
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

