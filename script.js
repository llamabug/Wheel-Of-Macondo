const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin");
const namesInput = document.getElementById("items");
const colours = [
    "#e7c68d",
    "#ca956c",
    "#b5ad69",
    "#e6e0d7",
    "#fbeea4",
    "#d6e08d",
]



let names = [];
let startAngle = 0;
let arc;
let spinTimeout;
let spinAngleStart = Math.random() * 10 + 10;
let spinTime = 0;
let spinTimeTotal = 0;
let spinning = false;
let pointerOffset = 0;
let pointerDirection = 1;



document.getElementById("closePopup").addEventListener("click", () => {
        document.getElementById("winnerPopup").style.display = "none";
    })



function drawWheel() {
    
    const radius = (canvas.width - 5) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    names.forEach((name, i) => {
        const angle = startAngle + i * arc;
        ctx.beginPath();
        ctx.arc(radius, radius, radius, angle, angle + arc, false);
        ctx.lineTo(radius, radius);
        ctx.fillStyle = colours[i % colours.length];
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.save();
        ctx.translate(radius + Math.cos(angle + arc / 2) * (radius / 2), radius + Math.sin(angle + arc / 2) * (radius / 2));
        ctx.rotate(angle + arc / 2);
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(name, -ctx.measureText(name).width / 2, 5);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(radius, radius, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    
    ctx.beginPath();
    ctx.moveTo(radius - 10 + pointerOffset, 10);
    ctx.lineTo(radius + 10 + pointerOffset, 10);
    ctx.lineTo(radius + pointerOffset, 50);
    ctx.fillStyle = "black";
    ctx.fill();

}

let currentSpeed = 40;

function rotateWheel() {

    if (currentSpeed <= 0.2) {
        stopRotateWheel();
        return;
    }
    
    startAngle += currentSpeed * Math.PI / 180;
    currentSpeed *= 0.985;

    drawWheel();
    requestAnimationFrame(rotateWheel);

}



function stopRotateWheel() {

    spinning = false;

    const degrees = (startAngle * 180 / Math.PI) % 360;
    const adjustedDegrees = (360 - degrees) % 360;
    const index = Math.floor(adjustedDegrees / (360 / names.length));
    
    
    document.getElementById("winnerText").textContent = names[index];
    document.getElementById("winnerPopup").style.display = "flex";
    

}



function easeOut(t, b, c, d) {

    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c + (tc + -3 * ts + 3 * t);

}



spinButton.addEventListener("click", () => {
    if (spinning) return; 
    names = namesInput.value.split(",").map(name => name.trim()).filter(name => name);
    if (names.length < 2) {
        alert("Please enter at least 2 items!");
        return;
    }
    currentSpeed = Math.random() * 20 + 30;
    arc = (2 * Math.PI) / names.length;
    spinAngleStart = Math.random() * 40 + 40;
    spinTime = 0;
    spinTimeTotal = Math.random() * 1000 + 1300;
    spinning = true;
    drawWheel();
    rotateWheel();

});


names = ["Code", "Build", "Dream", "Create", "Ship", "Macondo",];
arc = (2 * Math.PI) / names.length;
drawWheel();

/** const popup = document.getElementById("winnerPopup");

popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});*/
