const canvasDiv = document.querySelector(".canvas-div")
const canvas = document.querySelector(".clock-canvas");
const ctx = canvas.getContext('2d');
canvas.height = 300;
canvas.width = 300
const radius = 100
const clockX = canvas.height / 2;
const clockY =  canvas.width / 2 ;
let secondsHandAngle = -Math.PI / 2 + (new Date().getSeconds() + 1) * Math.PI / 30;


setInterval(() => {
    const s = new Date().getSeconds()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(clockX, clockY, radius, 0, 2 * Math.PI); 
    ctx.strokeStyle = 'black'; 
    ctx.stroke(); 

    ctx.beginPath();
    ctx.arc(clockX, clockY, 2, -Math.PI / 2 , 3 * Math.PI / 2, true)
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    const lineX = clockX + radius * Math.cos(secondsHandAngle);
    const lineY = clockY + radius * Math.sin(secondsHandAngle);
    ctx.lineTo(lineX, lineY);
    ctx.stroke();
    secondsHandAngle+= Math.PI / 30;
}, 1000);