"use strict";

var imageNames = ["images/bag.jpg","images/banana.jpg","images/bathroom.jpg","images/boots.jpg","images/breakfast.jpg","images/bubblegum.jpg","images/chair.jpg","images/cthulhu.jpg","images/dog-duck.jpg","images/dragon.jpg","images/pen.jpg","images/pet-sweep.jpg","images/scissors.jpg","images/shark.jpg","images/sweep.png","images/tauntaun.jpg","images/unicorn.jpg","images/usb.gif","images/water-can.jpg","images/wine-glass.jpg"];
var allImages = [];
var totalClicks = 0;

function Image(name){
    this.name = name;
    this.clicks = 0;
    this.views = 0;
    allImages.push(this);
};

function createImages(){
    for(var i = 0; i < imageNames.length; i++){
        new Image(imageNames[i]);
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
    randomImages.push(randomImage());
    randomImages.push(randomImage());
    randomImages.push(randomImage());
    while(randomImages[0] === randomImages[1]){
        randomImages[1] = randomImage();
    }
    while(randomImages[2] === randomImages[1] || randomImages[2] === randomImages[0]){
        randomImages[2] = randomImage();
    }

    for(var i = 0; i < 3; i++){
        allImages[randomImages[i]].views++;
        var img = document.createElement("img");
        img.setAttribute("src", allImages[randomImages[i]].name);
        img.setAttribute("data-type", allImages[randomImages[i]].name);
        img.addEventListener("click", handleVote);
        imagesSection.appendChild(img);
    }
}

function handleVote(event){
    var imageName = event.target.dataset.name;
    for(var i = 0; i < allImages.length; i++){
        if(allImages[i].name === imageName){
            allImages[i].clicks++;
            totalClicks++;
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
        li.textContent = image.name + " received " + image.clicks + " votes.";
        ul.appendChild(li);
    }
    results.appendChild(ul);
}

showResults();
createImages();
render();