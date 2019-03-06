class Consumer
{
    constructor(canvas)
    {
        this.bufferPointer = 5;
        this.canvas = canvas;

        console.log("Hello from consumer !");
    }

    draw(ctx)
    {
        let elemSize = (this.canvas.width - Constants.BUFFER_SIZE * (Constants.ELEM_MARGIN + 1)) / Constants.BUFFER_SIZE;

        let xPos = this.bufferPointer * (elemSize + Constants.ELEM_MARGIN) + Constants.ELEM_MARGIN;
        let yPos = (this.canvas.height - elemSize) / 2 + (elemSize + Constants.ELEM_MARGIN);

        ctx.beginPath();
        ctx.arc(xPos + elemSize/2, yPos + elemSize/2, elemSize/2, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
