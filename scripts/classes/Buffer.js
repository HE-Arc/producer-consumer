class Buffer
{
    constructor(canvas, size)
    {
        this.canvas = canvas;
        this.size = size;
        this.buffer = new Array(size);
        this.synchonized = true;
    }

    putElement(element, position)
    {
        if(this.buffer[position] != null)
            document.getElementById('errorMsg').innerHTML = "Put error, element " + this.buffer[position].getNumber() + " got overwritten";
        this.buffer[position] = element;

    }

    popElement(position)
    {
        let tmp = this.buffer[position];
        this.buffer[position] = null;
        return tmp;
    }

    canPut(position)
    {
        return this.buffer[position] == null || !this.synchonized;
    }

    canPopElement(position)
    {
        if(!this.synchonized && this.buffer[position] == null)
            document.getElementById('errorMsg').innerHTML = "Attempt to access an empty case";

        return this.buffer[position] != null;
    }

    getSize()
    {
        return this.size;
    }

    draw(ctx) // add number here
    {
        let caseSize = ((this.canvas.width - (this.size + 1) * Constants.ELEM_MARGIN) / this.size);
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
                ctx.fillStyle = this.buffer[i].getColor();
                this.buffer[i].draw(ctx, xPos + caseSize/2, yPos + caseSize/2, elemSize/2)
            }
        }
    }
}
