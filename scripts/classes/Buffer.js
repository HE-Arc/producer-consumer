class Buffer
{
    constructor(canvas, size)
    {
        this.canvas = canvas;
        this.size = size;
        this.buffer = new Array(size);
    }

    putElement(element, position)
    {
        this.buffer[position] = element;
    }

    canPopElement(position)
    {
        return this.buffer[position] != null;
    }

    popElement(position)
    {
        let tmp = this.buffer[position];
        this.buffer[position] = null;
        return tmp;
    }

    canPut(position)
    {
        return this.buffer[position] == null;
    }

    getSize()
    {
        return this.size;
    }

    draw(ctx)
    {
        let caseSize = (this.canvas.width - (this.size + 1) * Constants.ELEM_MARGIN) / this.size;
        let elemSize = caseSize - Constants.ELEM_MARGIN * 2;

        let yCenter = this.canvas.height/2;

        for(let i = 0; i < this.size; i++)
        {
            let xPos = i * (caseSize + Constants.ELEM_MARGIN) + Constants.ELEM_MARGIN;
            let yPos = yCenter - caseSize/2;

            ctx.beginPath();
            ctx.rect(xPos, yPos, caseSize, caseSize);
            ctx.stroke();

            if(this.buffer[i] != null)
            {
                ctx.fillStyle = this.buffer[i];

                ctx.beginPath();
                ctx.arc(xPos + caseSize/2, yPos + caseSize/2, elemSize/2, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();

                ctx.fillStyle = "#FFF";
            }
        }
    }
}
