var canvas = null;
var ctx = null;
var objects = null;
var parameters = null;

var ball = null;

function draw(canvas, ctx, objects, parameters)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < objects.length; i++)
    {
        objects[i].draw(ctx, parameters);
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
    draw(canvas, ctx, objects, parameters);
    window.requestAnimationFrame(function() { update(canvas, ctx, objects, parameters); });
}

function simulate()
{
    canvas = document.getElementById("simulator");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;

    const MIN_SIZE = 20.0;
    let cs = (Math.min(canvas.width, canvas.height)) / MIN_SIZE;
    let gr = { x: 0.0, y: 10.0 };

    ball = new Ball(0.5, {x: 2.0, y: 15.0}, (Math.PI / 5) + (3.0 * Math.PI / 2), 20.0, 'red');

    objects = [ball];
    parameters = 
    { 
        scale: cs, 
        width: (canvas.width / cs),
        height: (canvas.height / cs),
        ts: (1.0 / 60.0),
        gravity: gr,
        damping: 0.8
    };

    update(canvas, ctx, objects, parameters);
}