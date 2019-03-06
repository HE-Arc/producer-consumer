
var canvas;
var ctx;
var prod;
var cons;
var buffer;

function main()
{
    console.log("Start main !");


    canvas = document.getElementById("animation");
    ctx    = canvas.getContext("2d");

    prod   = new Producer(canvas, ctx);
    cons   = new Consumer(canvas, ctx);
    buffer = new Array(Constants.BUFFER_SIZE);

    buffer[5] = new Element(5, canvas, ctx);
    buffer[9] = new Element(9, canvas, ctx);
    buffer[0] = new Element(0, canvas, ctx);

    draw();

    console.log("End main !");
    console.log(Constants.BUFFER_SIZE);
}



function draw()
{
    let yCenter  = canvas.height / 2;
    let elemSize = (canvas.width - Constants.BUFFER_SIZE * (Constants.ELEM_MARGIN + 1)) / Constants.BUFFER_SIZE;


    for(let i = 0; i < Constants.BUFFER_SIZE; i++)
    {
        let xPos = i * (elemSize + Constants.ELEM_MARGIN) + Constants.ELEM_MARGIN;
        let yPos = yCenter - elemSize/2;

        ctx.beginPath();
        ctx.rect(xPos, yPos, elemSize, elemSize);
        ctx.stroke();

        if(buffer[i] != null)
        {
            buffer[i].draw(ctx, elemSize, yPos);
        }

        prod.draw(ctx);
        cons.draw(ctx);
    }

}
