
var canvas;
var ctx;

var prod;
var cons;
var buff;

function main()
{
    canvas = document.getElementById("animation");
    ctx    = canvas.getContext("2d");

    buff = new Buffer(canvas, Constants.BUFFER_SIZE);
    prod = new Producer(canvas, buff, 500);
    cons = new Consumer(canvas, buff, 700);

    initSilders();

    setInterval(update, Constants.UPDATE_TIME);
}

function update()
{
    prod.update();
    cons.update();

    //console.log("Cons : " + cons.updateTime + " --> prod : " + prod.updateTime)

    draw();
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    buff.draw(ctx);
    prod.draw(ctx);
    cons.draw(ctx);
}

function initSilders()
{
    document.getElementById('producerRange').value = prod.updateTime;
    document.getElementById('consumerRange').value = cons.updateTime;

    document.getElementById('producerRangeValue').innerHTML = prod.updateTime  + " ms";
    document.getElementById('consumerRangeValue').innerHTML = cons.updateTime  + " ms";
}

function producerValueChanged(newValue)
{
    document.getElementById('producerRangeValue').innerHTML = newValue  + " ms";
}

function consumerValueChanged(newValue)
{
    document.getElementById('consumerRangeValue').innerHTML = newValue + " ms";
}

function producerValueConfirmed(newValue)
{
    prod.updateTime = parseInt(newValue);
}

function consumerValueConfirmed(newValue)
{
    cons.updateTime = parseInt(newValue);
}
