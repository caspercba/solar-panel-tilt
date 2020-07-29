function fun1(x) {return Math.sin(x);  }
function fun2(x) {return Math.cos(3*x);}

function draw() {
    draw(0);
}

function draw(angle) {
    const canvas = document.getElementById("canvas");
    if (null==canvas || !canvas.getContext) return;

    const axes = {}, ctx = canvas.getContext("2d");
    axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
    axes.scale = 40;                 // 40 pixels from x=0 to x=1
    axes.doNegativeX = true;


    drawSun(ctx, canvas.width / 5, canvas.height / 4);
    drawPanel(ctx, angle, 300, 300, 200);
}

function drawPanel(ctx, targetAngle, posX, posY, size) {

    let currentAngle = 0;
    let deltaAngle = targetAngle / 100;

    const interval = setInterval(function () {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(posX, posY);
        ctx.lineTo(posX + size * Math.cos(Math.PI * -currentAngle / 180.0), posY + size * Math.sin(Math.PI * -currentAngle / 180.0));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        if(currentAngle < targetAngle) currentAngle += deltaAngle;
        else clearInterval(interval);
    }, 1000/ 80);

}

function drawSun(context, centerX, centerY) {

    const radius = 70;
    let currentX = -radius;
    let currentY = -radius;
    const deltaX = (radius + centerX) / 100
    const deltaY = (radius + centerY) / 100

    const interval = setInterval(function () {
        context.clearRect(0,0,centerX + radius,centerY + radius);
        context.beginPath();
        context.arc(currentX, currentY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'yellow';
        context.fill();
        context.stroke();
        context.closePath();

        if(currentX < centerX) currentX += deltaX;
        if(currentY < centerY) currentY += deltaY;

        if(currentX >= centerX && currentY >= centerY) clearInterval(interval)

    }, 1000 / 30)
}

function openGoogleMaps()
{
    var childWin = window.open("./google-maps-chooser.html", "_blank", "height=800, width=1000, status=yes, toolbar=no, menubar=no, location=no,addressbar=no");
}

function setGoogleMapsResult(lat, long) {
    const txt_lat = document.getElementById("txt_lat");
    const txt_long = document.getElementById("txt_long");
    txt_lat.value = lat;
    txt_long.value = long;
}

function calculateAngle() {
    const lat = document.getElementById("txt_lat").value;
    const long = document.getElementById("txt_long").value;
    if(lat.length > 0 && long.length > 0) {
        // let summerAngle = (Math.abs(lat) * 0.9) - 23.5;
        // let winterAngle = (Math.abs(lat) * 0.9) + 29;
        let summerAngle = Math.abs(lat) - 15;
        let winterAngle = Math.abs(lat) + 15;
        let average = (summerAngle + winterAngle) / 2;
        draw(average);
        console.log("summer: " + summerAngle + " , winter: " + winterAngle);
    } else {
        // no valid lat/long
        console.log("Please enter valid lat + long values")
    }

}


function funGraph (ctx,axes,func,color,thick) {
    let xx, yy, dx = 4, x0 = axes.x0, y0 = axes.y0, scale = axes.scale;
    const iMax = Math.round((ctx.canvas.width - x0) / dx);
    const iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (let i=iMin; i<=iMax; i++) {
        xx = dx*i; yy = scale*func(xx/scale);
        if (i===iMin) ctx.moveTo(x0+xx,y0-yy);
        else         ctx.lineTo(x0+xx,y0-yy);
    }
    ctx.stroke();
}

function showAxes(ctx,axes) {
    const x0 = axes.x0, w = ctx.canvas.width;
    const y0 = axes.y0, h = ctx.canvas.height;
    const xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
    ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
    ctx.stroke();
}