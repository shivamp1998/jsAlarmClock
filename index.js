const canvasDiv = document.querySelector(".canvas-div")
const canvas = document.querySelector(".clock-canvas");
const ctx = canvas.getContext('2d');
canvas.height = 300;
canvas.width = 300
const radius = 100
const clockX = canvas.height / 2;
const clockY =  canvas.width / 2 ;
let secondsHandAngle = -Math.PI / 2 + (new Date().getSeconds() + 1) * Math.PI / 30;
let minutesHandAngle = -Math.PI / 2 + (new Date().getMinutes() ) * Math.PI / 30;
let hoursHandlAngle = -Math.PI / 2 + ((new Date().getHours() % 12)) * Math.PI / 6;
let number = 0;

let i = 0;
for(let i=-Math.PI / 2; i<=3*Math.PI / 2; i+= Math.PI / 6) {
    ctx.strokeText(number == 0 ? 12 : number, clockX + (radius + 10) * Math.cos(i), clockY + (radius + 10) * Math.sin(i))
    number++;
    if(number == 12) break;
}

setInterval(() => {
    const s = new Date().getSeconds();
    const m = new Date().getMinutes();
    ctx.beginPath()
    ctx.arc(clockX, clockY,radius + 25, 0, 2 * Math.PI)
    ctx.strokeStyle="pink"
    ctx.stroke()
    
    ctx.beginPath();
    ctx.arc(clockX, clockY, radius, 0, 2 * Math.PI); 
    ctx.fillStyle = "beige";
    ctx.strokeStyle = "black"
    ctx.stroke();
    ctx.fill(); 

    
    
    ctx.beginPath();
    ctx.arc(clockX, clockY, 5, -Math.PI / 2 , 3 * Math.PI / 2, true)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    const lineX = clockX + (radius - 10) * Math.cos(secondsHandAngle);
    const lineY = clockY + (radius - 10) * Math.sin(secondsHandAngle);
    ctx.lineTo(lineX, lineY);
    ctx.strokeStyle = "red"
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    const lineMX = clockX + (radius-25) * Math.cos(minutesHandAngle);
    const lineMY = clockY + (radius-25) * Math.sin(minutesHandAngle);
    ctx.lineTo(lineMX, lineMY);
    ctx.strokeStyle="blue"
    ctx.stroke() 
    if(s == 0) {
        minutesHandAngle += Math.PI / 30
    }
    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    const lineHX = clockX  + (radius - 50) * Math.cos(hoursHandlAngle);
    const lineHY = clockY + (radius - 50) * Math.sin(hoursHandlAngle);
    ctx.lineTo(lineHX, lineHY);
    ctx.strokeStyle="green"
    ctx.stroke();
    if(m == 0 && s == 0) {
        hoursHandlAngle += Math.PI / 6;
    }
    secondsHandAngle+= Math.PI / 30;
}, 1000);