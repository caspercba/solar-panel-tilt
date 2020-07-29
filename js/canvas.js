/**
 * Called once we have calculated the desired angle (summer/winter average)
 * @param summerAngle
 * @param winterAngle
 */
function draw(summerAngle, winterAngle) {
    const canvas = document.getElementById("canvas");
    if (null == canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d")

    fillAngleLabels(summerAngle, winterAngle)
    drawSun(ctx, canvas.width / 5, canvas.height / 4);
    drawPanel(ctx, (summerAngle + winterAngle) / 2, 300, 300, 200);
}

/**
 * Draw solar panel at locaiton posX, posY and targetAngle inclination
 * @param ctx
 * @param targetAngle
 * @param posX
 * @param posY
 * @param size length of panel
 */
function drawPanel(ctx, targetAngle, posX, posY, size) {

    let currentAngle = 0;
    let deltaAngle = targetAngle / 100;

    const interval = setInterval(function () {
        let margin = 50;
        ctx.clearRect(posX - margin, posY - size, size + margin, size + margin);
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(posX, posY);
        ctx.lineTo(posX + size * Math.cos(Math.PI * -currentAngle / 180.0), posY + size * Math.sin(Math.PI * -currentAngle / 180.0));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.font = "30px Arial";
        ctx.fillStyle = "black"
        let text = "Avg Angle: " + Math.round(currentAngle)
        ctx.fillText(text, posX, posY + 30);
        if (currentAngle < targetAngle) currentAngle += deltaAngle;
        else clearInterval(interval);
    }, 1000 / 80);

}

/**
 * Draw the sun animated to centerX, centerY final position
 * @param context
 * @param centerX
 * @param centerY
 */
function drawSun(context, centerX, centerY) {

    const radius = 70;
    let currentX = -radius;
    let currentY = -radius;
    const deltaX = (radius + centerX) / 100
    const deltaY = (radius + centerY) / 100

    const interval = setInterval(function () {
        context.clearRect(0, 0, centerX + radius, centerY + radius);
        context.beginPath();
        context.arc(currentX, currentY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'yellow';
        context.fill();
        context.stroke();
        context.closePath();

        if (currentX < centerX) currentX += deltaX;
        if (currentY < centerY) currentY += deltaY;

        if (currentX >= centerX && currentY >= centerY) clearInterval(interval)

    }, 1000 / 100)
}

function fillAngleLabels(summerAngle, winterAngle) {
    const winter_angle = document.getElementById("winter_angle_value");
    const summer_angle = document.getElementById("summer_angle_value");
    const avg_angle = document.getElementById("avg_angle_value");
    winter_angle.value = winterAngle;
    summer_angle.value = summerAngle;
    avg_angle.value = (winterAngle + summerAngle) / 2;
}

/**
 * Open google maps location chooser
 */
function openGoogleMaps() {
    fillAngleLabels(0, 0);
    window.open("./google-maps-chooser.html", "_blank", "height=800, width=1000, status=yes, toolbar=no, menubar=no, location=no,addressbar=no");
}

/**
 * Callback from the maps html page, here we receive the resulting location
 * @param lat
 * @param long
 */
function setGoogleMapsResult(lat, long) {
    const txt_lat = document.getElementById("txt_lat");
    const txt_long = document.getElementById("txt_long");
    txt_lat.value = lat;
    txt_long.value = long;
}

/**
 * Take params (lat long) and calculate the right tilt angle and draw animation
 */
function calculateAngle() {
    const lat = document.getElementById("txt_lat").value;
    const long = document.getElementById("txt_long").value;
    if (lat.length > 0 && long.length > 0) {
        // let summerAngle = (Math.abs(lat) * 0.9) - 23.5;
        // let winterAngle = (Math.abs(lat) * 0.9) + 29;
        let summerAngle = Math.abs(lat) - 15;
        let winterAngle = Math.abs(lat) + 15;
        draw(summerAngle, winterAngle);
        console.log("summer: " + summerAngle + " , winter: " + winterAngle);
    } else {
        // no valid lat/long
        console.log("Please enter valid lat + long values")
    }
}

/**
 * Alternative Formulae
 */
function calculateAngleB() {
    const lat = document.getElementById("txt_lat").value;
    const long = document.getElementById("txt_long").value;
    if (lat.length > 0 && long.length > 0) {
        // let summerAngle = (Math.abs(lat) * 0.9) - 23.5;
        // let winterAngle = (Math.abs(lat) * 0.9) + 29;
        let summerAngle = Math.abs(lat) * 0.9 - 23.5;
        let winterAngle = Math.abs(lat) * 0.9 + 29;
        draw(summerAngle, winterAngle);
        console.log("summer: " + summerAngle + " , winter: " + winterAngle);
    } else {
        // no valid lat/long
        console.log("Please enter valid lat + long values")
    }
}