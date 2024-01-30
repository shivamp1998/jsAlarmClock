const hours = document.querySelector('.hours');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs')

const hoursInput = document.querySelector("input[name='hours']")
const minutesInput = document.querySelector("input[name='minutes']")
const secondsInput = document.querySelector("input[name='seconds']");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

ctx.fillStyle = "rgb(255,0,0)"
ctx.fillRect(0,0,50,50)
ctx.clearRect(0,0,25,25)

ctx.beginPath();
ctx.moveTo(51,5);
ctx.lineTo(51,51)
ctx.lineTo(102, 51);
ctx.lineTo(102, 5);
ctx.closePath();
ctx.fillStyle="rgb(0,255,0)"
ctx.fill()


const formatVal = (val) => {
    if(+val % 10 === +val) {
        return 0 + "" + val
    }else{
        return val;
    }   
}

const interval = setInterval(() => {
    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    hours.innerText = formatVal(h);
    mins.innerText = formatVal(m);
    secs.innerText = formatVal(s)
    const date = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), h,m,s)
    const alarmTime = sessionStorage.getItem('alarmDate');
    if(alarmTime !== null && date.getTime() >= new Date(alarmTime).getTime()) {
        play()
    }
}, 1000)

const setAlarm = () => {
    const h = hoursInput.value;
    const m = minutesInput.value;
    const s = secondsInput.value;
    const date = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), h,m,s)
    sessionStorage.setItem('alarmDate', date)
}

const play = () => {
    const audio = document.querySelector('.audiotone');
    audio.play();
}