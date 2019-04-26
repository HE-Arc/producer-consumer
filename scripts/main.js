
var canvas;
var ctx;

var prod;
var cons;
var buff;

var onPause;

function main()
{
    init();

    setInterval(update, Constants.UPDATE_TIME);
}

function init()
{
    canvas = document.getElementById("animation");
    ctx    = canvas.getContext("2d");

    buff = new Buffer(canvas, Constants.BUFFER_SIZE);
    prod = new Producer(canvas, buff, 500);
    cons = new Consumer(canvas, buff, 700);

    onPause = false;

    initHTML();
}

function update()
{
    if(!onPause)
    {
        prod.update();
        cons.update();
        draw();
    }
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    buff.draw(ctx);
    prod.draw(ctx);
    cons.draw(ctx);
}

function initHTML()
{
    document.getElementById('producerRange').value = prod.updateTime;
    document.getElementById('consumerRange').value = cons.updateTime;

    document.getElementById('producerRangeValue').innerHTML = prod.updateTime  + " ms";
    document.getElementById('consumerRangeValue').innerHTML = cons.updateTime  + " ms";

    document.getElementById('pauseButton').innerHTML = "Pause";
    document.getElementById('pauseButton').className = "btn bg-red";

    document.getElementById('errorMsg').innerHTML = "";
}

// -- EVENTS -------------------------------------------------------------------

function producerValueChanged(newValue) { document.getElementById('producerRangeValue').innerHTML = newValue  + " ms"; }
function consumerValueChanged(newValue) { document.getElementById('consumerRangeValue').innerHTML = newValue + " ms"; }

function producerValueConfirmed(newValue) { prod.updateTime = parseInt(newValue); }
function consumerValueConfirmed(newValue) { cons.updateTime = parseInt(newValue); }

function changeSynchonize() { this.buff.synchonized = !this.buff.synchonized; }
function changePause()
{
    this.onPause = !this.onPause;

    if(onPause)
    {
        document.getElementById('pauseButton').innerHTML = "Start";
        document.getElementById('pauseButton').className = "btn bg-green";
    }
    else
    {
        document.getElementById('pauseButton').innerHTML = "Pause";
        document.getElementById('pauseButton').className = "btn bg-red";
    }
}
