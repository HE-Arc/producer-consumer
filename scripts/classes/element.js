class Element
{
    constructor(index, canvas)
    {
        this.index = index;
    }

    draw(ctx, elemSize, yPos)
    {
        let xPos = this.index * (elemSize + Constants.ELEM_MARGIN) + (2 * Constants.ELEM_MARGIN);
        yPos += Constants.ELEM_MARGIN;
        elemSize -= 2 * Constants.ELEM_MARGIN;

        ctx.beginPath();
        ctx.arc(xPos + elemSize/2, yPos + elemSize/2, elemSize/2, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
