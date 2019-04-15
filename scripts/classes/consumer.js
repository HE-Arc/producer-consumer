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
        this.objectColor = null;
    }

    update()
    {
        if(this.took || this.buffer.canPopElement(this.bufferPointer))
        {
            this.timeLeft -= Constants.UPDATE_TIME;
            this.took = true;

            if(this.objectColor == null)
                this.objectColor = this.buffer.popElement(this.bufferPointer);

            if(this.timeLeft <= 0)
            {
                this.timeLeft += this.updateTime;

                this.moveNext();
                this.took = false;
                this.objectColor = null;
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

        if(this.took)
        {
            ctx.fillStyle = this.objectColor;
            ctx.beginPath();
            ctx.beginPath();
            ctx.arc(xPos + elemSize/2, objectY + elemSize/2, dSize/2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill()

            ctx.fillStyle = '#FFF';
        }

        ctx.beginPath();
        ctx.arc(xPos + elemSize/2, yPos + elemSize/2, elemSize/2, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
