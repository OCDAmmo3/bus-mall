"use strict";

// window.addEventListener("load", function onLoad() {
//     loadFromStorage();

//     if (Image.all.length === 0) {
//         initialize();
//     }
//     render();
// });

function storeResults() {
    localStorage["Image"] = JSON.stringify(Image.allImages);
}
console.log(localStorage);

var imageNames = [
    ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dogDuck", "dragon", "pen", "petSweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "waterCan", "wineGlass"],
    ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"],
    ["Star Wars Suitcase", "Banana Slicer", "Bathroom TP and Tablet Holder", "Boots w/ Hole for Toes", "All-in-One Breakfast Machine", "Meatball Bubblegum", "Bubble Chair", "Cthulhu", "Dog w/ Duck Mask", "Dragon Meat", "Silverware Pens", "Pet Sweeper Shoes", "Pizza Scissors", "Shark Sleeping Bag", "Baby Sweeper Outfit", "Star Wars Sleeping Bag", "Unicorn Meat", "Tentacle USB", "Illogical Watering Can", "Illogical Wine Glass"]
];
var allImages = [];
var totalClicks = 0;
var displayNumber = 3;
var lastShown = [];
var globalRandomImages = [];
var colors = [];
var colors2 = [];

console.table(imageNames);

function Image(){
    this.imageURL = "images/";
    this.name = "";
    this.description = "";
    this.clicks = 0;
    this.views = 0;
    allImages.push(this);
    colors.push(getRandomRgba());
    colors2.push(getRandomRgb());
};

function createImages(){
    for(var i = 0; i < imageNames[0].length; i++){
        new Image(imageNames[i]);
        allImages[i].name = imageNames[0][i];
        allImages[i].imageURL += imageNames[1][i];
        allImages[i].description = imageNames[2][i];
    }
    console.table(allImages);
}

function randomImage(){
    return Math.floor(Math.random()*allImages.length);
}

function render(){
    var imagesSection = document.getElementById("products");
    imagesSection.innerHTML = "";

    var randomImages = [];
    for(var i = 0; i < displayNumber; i++){
        var image = randomImage();
        while(randomImages.includes(image) || lastShown.includes(image)){
            image = randomImage();
        }
        randomImages.push(image);
    }
    // randomImages.push(randomImage());
    // randomImages.push(randomImage());
    // randomImages.push(randomImage());
    // while(randomImages[0] === randomImages[1]){
    //     randomImages[1] = randomImage();
    // }
    // while(randomImages[2] === randomImages[1] || randomImages[2] === randomImages[0]){
    //     randomImages[2] = randomImage();
    // }

    for(var i = 0; i < 3; i++){
        allImages[randomImages[i]].views++;
        var imgDiv = document.createElement("div");
        imgDiv.classList.add("imgDiv");
        var img = document.createElement("img");
        img.setAttribute("name", allImages[randomImages[i]].description);
        img.setAttribute("src", allImages[randomImages[i]].imageURL);
        img.setAttribute("data-name", allImages[randomImages[i]].name);
        img.addEventListener("click", handleVote);
        imgDiv.appendChild(img);
        imagesSection.appendChild(imgDiv);
    }
    globalRandomImages = randomImages;
}

function handleVote(event){
    var imageName = event.target.dataset.name;
    // console.log(imageName);
    for(var i = 0; i < allImages.length; i++){
        if(allImages[i].name === imageName){
            allImages[i].clicks++;
            totalClicks++;
            lastShown = globalRandomImages;
            render();
        }
    }
    if(totalClicks === 25){
        var imgs = document.getElementsByTagName("img");
        for(var i = 0; i < imgs.length; i++){
            imgs[i].removeEventListener("click", handleVote);
        }
        showResults();
        storeResults();
    }
    console.table(allImages);
    console.log("Total Clicks", totalClicks);
}
// function getRandomRgba() {
//     var num = Math.round(0xffffff * Math.random());
//     var r = num >> 16;
//     var g = num >> 8 & 255;
//     var b = num & 255;
//     return `rgba(${r},${g},${b},.4)`;
// }
// function getRandomRgb() {
//     var num = Math.round(0xffffff * Math.random());
//     var r = num >> 16;
//     var g = num >> 8 & 255;
//     var b = num & 255;
//     return `rgb(${r},${g},${b})`;
// }

function getRandomRgba(){
    var r = Math.round(255*Math.random());
    var g = Math.round(255*Math.random());
    var b = Math.round(255*Math.random());
    return `rgba(${r},${g},${b},.4)`;
}
function getRandomRgb(){
    var r = Math.round(255*Math.random());
    var g = Math.round(255*Math.random());
    var b = Math.round(255*Math.random());
    return `rgba(${r},${g},${b})`;
}

function createChart(ctx, labels, dataLabel, data) {
    var canvas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: dataLabel,
                data: data,
                backgroundColor: colors,
                borderColor: colors2,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
function showResults(){
    var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    var context2d = canvas.getContext("2d");

    var labels = [];
    var data = [];

    for(var i = 0; i < allImages.length; i++){
        labels.push(allImages[i].description);
        data.push(allImages[i].clicks);
    }
    createChart(context2d, labels, "Number of Votes", data);

    var results = document.getElementById("results");
    results.appendChild(canvas);
}

function storeResults() {
    localStorage.setItem("allImages", JSON.stringify(allImages))
    console.log(localStorage.allImages);
}
function callStorage(){
    var storage = localStorage["allImages"];
    if(storage){
        allImages = JSON.parse(storage);
        showResults();
    } else{
        return;
    }
    imgs[i].removeEventListener("click", handleVote);
}

var resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener("click", function resetClick(event){
    console.log("reset click", event);
    localStorage.clear();
    render();
    createImages();
});

createImages();
callStorage();
render();