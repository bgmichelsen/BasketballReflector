var canvas = null;
var ctx = null;
var objects = null;
var parameters = null;

var ball = null;

function draw(canvas, ctx, objects)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < objects.length; i++)
    {
        objects[i].draw(ctx);
    }
}

function simulation(objects, parameters)
{
    for (var i = 0; i < objects.length; i++)
    {
        objects[i].simulate(parameters);
    }
}

function update(canvas, ctx, objects, parameters)
{
    simulation(objects, parameters);
    draw(canvas, ctx, objects);
    window.requestAnimationFrame(function() { update(canvas, ctx, objects, parameters); });
}

function simulate()
{
    canvas = document.getElementById("simulator");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;

    const MIN_SIZE = 20.0;
    let scale = (Math.min(canvas.width, canvas.height)) / MIN_SIZE;

    const START = 0.5*scale;

    ball = new Ball(START, {x: START, y: START}, 0.1, 'red');

    objects = [ball];
    parameters = null;

    update(canvas, ctx, objects, parameters);
}