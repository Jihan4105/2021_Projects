var vegitTitle='GreenOnion';

function initDataform(event){
    vegitTitle=event.currentTarget.outerText;
    $("#vegitTitle").text(vegitTitle);
    $("#avgTemp").val("");
    $("#minTemp").val("");
    $("#maxTemp").val("");
    $("#rainFall").val("");
    $("#predictPrice").text("0");
}
