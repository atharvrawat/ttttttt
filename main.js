status = "";

objects = []
function preload() {
    song=loadSound("FM9B3TC-alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
video=createCapture(VIDEO)
video.hide()

   

}
function start(){
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status:detecting objects";
}
function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
    object_detector.detect(video,gotresults)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status:Object Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objevt detected are: "+objects.length;
            fill("red")
            stroke("red")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found ";
                song.stop();
                
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found ";
                song.play();   
            }
            if(objects.length==0){
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found ";
                song.play();
                
            } 
        }
    }


}

function modelloaded() {
    console.log("model is loaded")
    status = true;
    
}

function gotresults(error, results) {
    if (error) {
        console.log(error)

    }
    else {
        console.log(results);
        objects = results
    }
}