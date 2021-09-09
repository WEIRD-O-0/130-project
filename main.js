song = "";





function preload()
{
    song= loadSound("music2.mp3");
}

leftwristX = 0;
leftwristY = 0;
rightwristY = 0;
rightwristX = 0;


function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses()
{
    if(results.length > 0)
    {
        console.log(results);
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scorerightwrist = " + scorerightwrist +"scoreleftwrist = " + scoreleftwrist);

        
       leftwristX = results[0].pose.leftwrist.x;
       leftwristY = results[0].pose.leftwrist.y;
       console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY);
       
       rightwristX = results[0].pose.leftwrist.x;
       rightwristY = results[0].pose.rightwrist.y;
       console.log("rightwristY " + rightwristY + "leftwristX =" + rightwristX);
    }
    
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#42070F")
    stroke("#42070F")

   if(scorerightwrist > 0.2)
    {

    circle(rightwristX, rightwristY, 20);

    if(rightwristY >0 && rightwristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Song Name is 'Harry Potter Remix' ";
        song.rate(1.5);

    }


     else if(leftwristY >0 && leftwristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Song Name is 'Peter Pan' ";
        song.rate(1.5);
        
    }

}
    

    if(scoreleftwrist > 0.2)
    {
        circle(leftwristX, leftwristY, 20);
        InNumberleftwristY = Number(leftwristY);
        remove_decimals = floor(InputEventNumberleftwristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play()
{

    song.setVolume(1);
    song.rate(1);
}