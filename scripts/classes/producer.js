class Producer
{
    constructor(canvas, buffer, updateTime)
    {
        this.canvas = canvas;
        this.buffer = buffer;
        this.updateTime = updateTime;

        this.bufferPointer = 0;
        this.timeLeft = this.updateTime;

        this.put = false;
        this.object = null;
        this.objectCounter = 0;
    }

    update()
    {
        if(this.object == null)
            this.object = new Element(this.getRandomColor(), this.objectCounter);
            console

        if(this.put || this.buffer.canPut(this.bufferPointer))
        {
            this.timeLeft -= Constants.UPDATE_TIME;
            this.put = true;

            if(this.timeLeft <= 0)
            {
                this.timeLeft = this.updateTime;
                //console.log(this.timeLeft)
                this.buffer.putElement(this.object, this.bufferPointer);
                this.moveNext();
                this.put = false;
                this.object = null;
                this.objectCounter += 1;
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
        let yPos = (this.canvas.height - elemSize) / 2 - (elemSize + 5 * Constants.ELEM_MARGIN);

        let dSize = elemSize - Constants.ELEM_MARGIN * 2;
        let dist = this.canvas.height/2 - (yPos + elemSize/2);
        let objectY = yPos + dist - dist * this.timeLeft / this.updateTime;

        if(this.object != null)
        {
            this.object.draw(ctx, xPos + elemSize/2, objectY + elemSize/2, dSize/2)
        }

        ctx.beginPath();
        ctx.arc(xPos + elemSize/2, yPos + elemSize/2, elemSize/2, 0, 2 * Math.PI);
        ctx.stroke();
    }

    getRandomColor()
    {
        var letters = '0123456789ABCDEF';
        var color = '#';

        for (var i = 0; i < 6; i++)
            color += letters[Math.floor(Math.random() * 16)];

        return color;
    }
}
