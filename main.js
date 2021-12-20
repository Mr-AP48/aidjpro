song1 = "";
song2 = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is Good To Go!!!!!!")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log("Right Wrist Score: " + scoreRightWrist + "Left Wrist Score: " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("Left Wrist X: " + leftWristX + "Left Wrist Y: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist X: " + rightWristX + "Right Wrist Y: " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#00ff00");
    stroke("#00ff00");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        song1.play();
        document.getElementById("speedValue").innerHTML = "Playing Music 1"
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        song2.play();
        document.getElementById("volumeValue").innerHTML = "Playing Music 2"
    }
}

function stop() {
    song1.stop();
    song2.stop();
}