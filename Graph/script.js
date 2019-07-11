var url = "http://localhost:3000/links";

//Recursion - continuously getJSON till it changes
// once change - count turns and click
var turns = 0;
var pathLength = [];
function play() {
    $.getJSON(url, function (data) {
        var numLinks = data.links.length;

        //end of game
        if (numLinks === 0) {
            pathLength.push(turns);
            console.log(pathLength);
            turns = 0;
        }
        //next stage of game, choose option, move on
        else {
            //generate random number with number of options
            var ranOp = Math.round(Math.random() * (numLinks - 1));
            //click random option
            $.get("http://localhost:3000/click/" + ranOp, function () {
                turns++;
                play();
            })
        }
    })
}

//setting asynchronous to false
$.ajaxSetup({
    async: false
});

//number of times bot plays the twine game
var numGames = 20;
for(let n = 0; n < numGames; n++){
    // resets game
    $.get("http://localhost:3000/reset", function(){
        play();
    });
}

//find average, max, and min path lengths
var sum = pathLength.reduce(getSum);
var average = sum / pathLength.length;
var max = Math.max(...pathLength);
var min = Math.min(...pathLength);

console.log("Sum: " + sum);

//set HTML to show on page
document.getElementById("average").innerText = "Average: " + average;
document.getElementById("max").innerText = "Max: " + max;
document.getElementById("min").innerText = "Min: " + min;

//calculates sum
function getSum(total, num){
    return total + num;
}