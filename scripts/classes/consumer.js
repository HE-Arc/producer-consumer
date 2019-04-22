class Consumer
{
    constructor(canvas, buffer, updateTime)
    {
        this.canvas = canvas;
        this.buffer = buffer;
        this.updateTime = updateTime;

        this.bufferPointer = 0;
        this.timeLeft = this.updateTime;

        this.took = false;
        this.object = null;

        this.image = new Image();
        //this.image.src = "D:\\ETUDES\\Conception_OS\\Projet\\Prod_Cons_V2\\producer-consumer\\img\\consumer.png"
        this.image.src = "img\\consumer.png"
        //this.image.src = "../img/consumer.png"
    }

    update()
    {
        if(this.took || this.buffer.canPopElement(this.bufferPointer))
        {
            this.timeLeft -= Constants.UPDATE_TIME;
            this.took = true;

            if(this.object == null)
                this.object = this.buffer.popElement(this.bufferPointer);

            if(this.timeLeft <= 0)
            {
                this.timeLeft += this.updateTime;

                this.moveNext();
                this.took = false;
                this.object = null;
            }
        }
    }

    moveNext()
    {
        if(this.bufferPointer < Constants.BUFFER_SIZE - 1)
            this.bufferPointer += 1;
        else
            this.bufferPointer = 0;
    }

    draw(ctx)
    {
        let elemSize = (this.canvas.width - (this.buffer.getSize() + 1) * Constants.ELEM_MARGIN) / this.buffer.getSize();

        let xPos = this.bufferPointer * (elemSize + Constants.ELEM_MARGIN) + Constants.ELEM_MARGIN;
        let yPos = (this.canvas.height - elemSize) / 2 + (elemSize + 5 * Constants.ELEM_MARGIN);

        let dSize = elemSize - Constants.ELEM_MARGIN * 2;
        let dist = this.canvas.height/2 - (yPos + elemSize/2);
        let objectY = yPos + dist * this.timeLeft / this.updateTime;

        ctx.drawImage(this.image, xPos-elemSize/4, yPos-elemSize/4,
                        1.5*elemSize, 1.5*elemSize);

        if(this.took)
        {
            this.object.draw(ctx, xPos + elemSize/2, objectY + elemSize/2, dSize/2)
        }

        /*ctx.beginPath();
        ctx.arc(xPos + elemSize/2, yPos + elemSize/2, elemSize/2, 0, 2 * Math.PI);
        ctx.stroke();*/

        //ctx.fillText("Consumer", xPos+elemSize/2, yPos + elemSize + 2*Constants.ELEM_MARGIN + 20);

        //ctx.drawImage(this.image, xPos - 10, yPos + elemSize + 2*Constants.ELEM_MARGIN);

    }
}
