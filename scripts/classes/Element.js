class Element
{
    constructor(color, number)
    {
        this.color = color;
        this.number = number;
    }

    getColor()
    {
        return this.color;
    }

    getNumber()
    {
        return this.number;
    }

    setColor(color)
    {
        this.color = color;
    }

    draw(ctx, x, y, length)
    {    
        ctx.textAlign = "center";
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, length, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill()

        ctx.fillStyle = '#FFF';
        if (this.number.toString().length == 1)
        {
            ctx.font = "60px Arial";
            ctx.fillText(this.number, x, y+15);
        }
        else if(this.number.toString().length == 2)
        {
            ctx.font = "50px Arial";
            ctx.fillText(this.number, x, y+15);
        }
        else
        {
            ctx.font = "40px Arial";
            ctx.fillText(this.number, x-1, y+12);
        }
    }
}
