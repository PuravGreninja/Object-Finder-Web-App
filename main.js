status = "";
obj_name = "";
object = [];
function preload() {

}

function setup() {
    canvas = createCanvas(430, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 430, 300);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            label = object[i].label;
            percent = floor(object[i].confidence * 100);
            stroke("red");
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            text(label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            if (label==obj_name) {
                video.stop();
                document.getElementById("status_found").innerHTML =obj_name+" found";
            }
            else{
                document.getElementById("status_found").innerHTML =obj_name+" not found";
            }
        }
    }
}

function Start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    obj_name = document.getElementById("obj_name").value;
    document.getElementById("status").innerHTML = "Detecting Objects";
}
function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object=results;
    }
}