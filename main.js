video = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
   video.hide();
}

function setup(){
    ctx = createCanvas(480,380);
    ctx.center();
    
   


}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objDetector.detect(video,Gotresults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "There are: " + objects.length + " " + "objects detected.";
            percent = floor(objects[i].confidence * 100);
            fill("#ff0000");
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

    

}



function start(){
    objDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function Gotresults(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}