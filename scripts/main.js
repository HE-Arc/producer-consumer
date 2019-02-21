
var BUFFER_SIZE = 10;

var canvas;
var ctx;

var prod;
var cons;
var buffer;

function main()
{
    console.log("Start main !");

    canvas = document.getElementById("animation");
    ctx = canvas.getContext("2d");

    prod   = new Producer(BUFFER_SIZE);
    cons   = new Consumer(BUFFER_SIZE);

    buffer = new Array(BUFFER_SIZE);

    buffer[3] = 1;

    draw();

    console.log("End main !");
}

function draw()
{
    let elemSize = 50;
    let elemMargin = 5;
    for(let i = 0; i < BUFFER_SIZE; i++)
    {
        let xPos = i * (elemSize + elemMargin) + elemMargin;
        let yPos = elemMargin;

        ctx.beginPath();
        ctx.rect(xPos, yPos, elemSize, elemSize);
        ctx.stroke();

        if(buffer[i] == 1)
        {
            ctx.beginPath();
            ctx.arc(xPos + elemSize/2, yPos + elemSize/2, elemSize/2, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}
