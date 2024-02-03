const canvasDiv = document.querySelector(".canvas-div")
const canvas = document.querySelector(".clock-canvas");
const ctx = canvas.getContext('2d');
canvas.height = 300;
canvas.width = 300
const radius = 100
const clockX = canvas.height / 2;
const clockY =  canvas.width / 2 ;
let secondsHandAngle = -Math.PI / 2 + (new Date().getSeconds() + 1) * Math.PI / 30;
let minutesHandAngle = -Math.PI / 2 + (new Date().getMinutes() + 1) * Math.PI / 30;
let hoursHandlAngle = -Math.PI / 2 + ((new Date().getHours() % 12)) * Math.PI / 6;

let colorArr = ['rgb(230,215,255)', 'beige', 'rgb(250, 175, 186)','rgb(186, 184,108)']
let i = 0;
setInterval(() => {
    const s = new Date().getSeconds();
    const m = new Date().getMinutes();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(clockX, clockY, radius, 0, 2 * Math.PI); 
    ctx.fillStyle = colorArr[i];
    i = (i + 1) % 4;
    console.log(i)
    ctx.fill(); 

    
    ctx.beginPath()
    ctx.arc(clockX, clockY,radius + 10, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.beginPath();
    ctx.arc(clockX, clockY, 2, -Math.PI / 2 , 3 * Math.PI / 2, true)
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    const lineX = clockX + (radius - 10) * Math.cos(secondsHandAngle);
    const lineY = clockY + (radius - 10) * Math.sin(secondsHandAngle);
    ctx.lineTo(lineX, lineY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    const lineMX = clockX + (radius-25) * Math.cos(minutesHandAngle);
    const lineMY = clockY + (radius-25) * Math.sin(minutesHandAngle);
    ctx.lineTo(lineMX, lineMY);
    ctx.stroke() 
    if(s == 0) {
        minutesHandAngle += Math.PI / 30
    }
    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    const lineHX = clockX  + (radius - 50) * Math.cos(hoursHandlAngle);
    const lineHY = clockY + (radius - 50) * Math.sin(hoursHandlAngle);
    ctx.lineTo(lineHX, lineHY);
    ctx.stroke();
    if(m == 0) {
        hoursHandlAngle += Math.PI / 15;
    }
    secondsHandAngle+= Math.PI / 30;
}, 1000);