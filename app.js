"use strict";

var imageNames = [
    ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dogDuck", "dragon", "pen", "petSweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "waterCan", "wineGlass"],
    ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"],
    ["Star Wars Sleeping Bag", "Banana Slicer", "Bathroom TP and Tablet Holder", "Boots w/ Hole for Toes", "All-in-One Breakfast Machine", "Meatball Bubblegum", "Bubble Chair", "Cthulhu", "Dog w/ Duck Mask", "Dragon Meat", "Silverware Pens", "Pet Sweeper Shoes", "Pizza Scissors", "Shark Sleeping Bag", "Baby Sweeper Outfit", "Star Wars Sleeping Bag", "Unicorn Meat", "Tentacle USB", "Illogical Watering Can", "Illogical Wine Glass"]
];
var allImages = [];
var totalClicks = 0;
var displayNumber = 3;
var lastShown = [];
var globalRandomImages = [];

console.table(imageNames);

function Image(){
    this.imageURL = "images/";
    this.name = "";
    this.description = "";
    this.clicks = 0;
    this.views = 0;
    allImages.push(this);
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
        var img = document.createElement("img");
        img.setAttribute("name", allImages[randomImages[i]].description);
        img.setAttribute("src", allImages[randomImages[i]].imageURL);
        img.setAttribute("data-name", allImages[randomImages[i]].name);
        img.addEventListener("click", handleVote);
        imagesSection.appendChild(img);
    }
    globalRandomImages = randomImages;
}

function handleVote(event){
    var imageName = event.target.dataset.name;
    console.log(imageName);
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
    }
    console.table(allImages);
    console.log("Total Clicks", totalClicks);
}

function showResults(){
    var results = document.getElementById("results");
    var ul = document.createElement("ul");
    for(var i = 0; i < allImages.length; i++){
        var image = allImages[i];
        var li = document.createElement("li");
        li.textContent = image.description + " received " + image.clicks + " votes.";
        ul.appendChild(li);
    }
    results.appendChild(ul);
}

var ctx = document.getElementById('canvas').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: imageNames[2],
        datasets: [{
            label: 'Results',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: imageNames[2].totalClicks
        }]
    },

    // Configuration options go here
    options: {}
});

showResults();
createImages();
render();