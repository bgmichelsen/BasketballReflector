class Ball
{
    constructor(radius, strt_pos, launch_angle, velocity, color)
    {
        this.rad = radius;
        this.pos = { x: strt_pos.x, y: strt_pos.y };
        this.angle = launch_angle;
        
        // Calculate the velocity components
        let x_vel = velocity * Math.cos(launch_angle);
        let y_vel = velocity * Math.sin(launch_angle);
        this.velocity = { x: x_vel, y: y_vel };

        this.color = color;
    }

    draw(ctx, parameters)
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let x = this.pos.x * parameters.scale;
        let y = this.pos.y * parameters.scale;
        let r = this.rad * parameters.scale;
        ctx.arc(x, y, r, 0.0, 2.0 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    simulate(parameters)
    {
        let ts = parameters.ts;
        let gr = parameters.gravity;

        this.velocity.x += gr.x * ts;
        this.velocity.y += gr.y * ts;
        this.pos.x += this.velocity.x * ts;
        this.pos.y += this.velocity.y * ts;

        this.handle_wall_collisions(parameters);
        this.handle_stopping();   
    }

    handle_wall_collisions(parameters)
    {
        let x = this.pos.x;
        let y = this.pos.y;
        if ((x - this.rad) <= 0.0)
        {
            this.pos.x = this.rad;
            this.velocity.x *= (-1 * parameters.damping);
        }
        if ((x + this.rad) >= parameters.width)
        {
            this.pos.x = (parameters.width - this.rad);
            this.velocity.x *= (-1 * parameters.damping);
        }
        if ((y - this.rad) <= 0.0)
        {
            this.pos.y = this.rad;
            this.velocity.y *= (-1 * parameters.damping);
        }
        if ((y + this.rad) >= parameters.height)
        {
            this.pos.y = (parameters.height - this.rad);
            this.velocity.y *= (-1 * parameters.damping);
        }
    }

    handle_stopping()
    {
        if (this.velocity.x < 0.1 && this.velocity < 0.1)
        {
            this.velocity.y = 0.0;
            this.velocity.x = 0.0;
        }
    }
}