class Ball
{
    constructor(radius, strt_pos, launch_angle, color)
    {
        this.rad = radius;
        this.pos = { x: strt_pos.x, y: strt_pos.y };
        this.angle = launch_angle;
        this.color = color;
    }

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let x = this.pos.x;
        let y = this.pos.y;
        ctx.arc(x, y, this.rad, 0.0, 2.0 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    simulate(parameters)
    {
        this.pos.x += 0.2;
        this.pos.y += 0.2;
    }
}