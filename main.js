image1 = "";
status = "";
object = [];

function preload(){
    image1 = loadImage("dog_cat.jpg")
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    ObjectDetection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Object Detection has started.";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    ObjectDetection.detect(image1, getResults);
}

function getResults(error, results){

    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(image1, 0, 0, 640, 420);
    
    if(status != ""){
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected.";
            percent = floor(object[i].confidence * 100);
            fill("#FF0000");
            text(object[i].label + " " + percent + "%" , object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].height, object[i].width);
        }
    }
}

