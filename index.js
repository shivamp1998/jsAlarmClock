const canvasDiv = document.querySelector(".canvas-div");
const canvas = document.querySelector(".clock-canvas");
const ctx = canvas.getContext("2d");
const audio = document.querySelector(".alarm");
const button = document.querySelector('button[type=submit]');
const popupEl = document.querySelector('.alert-box');
sessionStorage.clear();

canvas.height = 300;
canvas.width = 300;
const radius = 100;
const clockX = canvas.height / 2;
const clockY = canvas.width / 2;
/* starting position of all the needles */
let secondsHandAngle = -Math.PI / 2 + ((new Date().getSeconds() + 1) * Math.PI) / 30;
let minutesHandAngle = -Math.PI / 2 + (new Date().getMinutes() * Math.PI) / 30;
let hoursHandlAngle = -Math.PI / 2 + ((new Date().getHours() % 12) * Math.PI) / 6;

/*looping over values from 1 to 12 to give clock time values*/
let number = 0;
ctx.beginPath();
ctx.arc(clockX, clockY, radius + 25, 0, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();
for (let i = -Math.PI / 2; i <= (3 * Math.PI) / 2; i += Math.PI / 6) {
  ctx.strokeStyle = "brown";
  ctx.strokeText(
    number == 0 ? 12 : number,
    clockX + (radius + 10) * Math.cos(i),
    clockY + (radius + 15) * Math.sin(i)
  );
  number++;
  if (number == 12) break;
}

/* getting values when alarm is ringing*/
const alarmHours = document.querySelector('.alarm-hours');
const alarmMinutes = document.querySelector('.alarm-minutes');
const alarmSeconds = document.querySelector('.alarm-seconds');
const alarmMeredian = document.querySelector('.alarm-meredian');

/* toggle alarm states*/
const heading = document.querySelector('.heading');
const setAlarmDiv = document.querySelector('.alarm-setting');
const ringingAlarmDiv = document.querySelector('.ringing-alarm');
const cancelBtn = document.querySelector('#reset');
const submitBtn = document.querySelector('#submit');


/* resetting alarm when ringing */

const handleResetAlarm = () => {
    audio.pause();
    sessionStorage.setItem("alarmTime",null)
    heading.innerHTML = `Set Alarm For`
    setAlarmDiv.classList.remove('none')
    submitBtn.classList.remove('none')
    ringingAlarmDiv.classList.add('none')
    cancelBtn.classList.add('none');
}

cancelBtn.addEventListener('click', handleResetAlarm);



const interval = setInterval(() => {
  const h = new Date().getHours();
  const s = new Date().getSeconds();
  const m = new Date().getMinutes();
  const alarmTime = sessionStorage.getItem("alarmTime");
  if (alarmTime !== null && alarmTime !== 'null') {
    if (new Date(alarmTime).getTime() <= new Date().getTime()) {
      audio.play();
    }else{
      console.log('alarmtime',alarmTime)
      alarmHours.innerHTML = getFormat(new Date(alarmTime).getHours()) + ":";
      alarmMinutes.innerHTML = getFormat(new Date(alarmTime).getMinutes()) + ":";
      alarmSeconds.innerHTML = getFormat(new Date(alarmTime).getSeconds()); 
      cancelBtn.classList.remove('none');
    }
  }

  //inner Circle
  ctx.beginPath();
  ctx.arc(clockX, clockY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "beige";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fill();

  //cicle at the center of clock
  ctx.beginPath();
  ctx.arc(clockX, clockY, 5, -Math.PI / 2, (3 * Math.PI) / 2, true);
  ctx.strokeStyle = "brown";
  ctx.stroke();

  //seconds hand needle
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  const lineX = clockX + (radius - 10) * Math.cos(secondsHandAngle);
  const lineY = clockY + (radius - 10) * Math.sin(secondsHandAngle);
  ctx.lineTo(lineX, lineY);
  ctx.strokeStyle = "magenta";
  ctx.stroke();

  //minute hand needle
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  const lineMX = clockX + (radius - 25) * Math.cos(minutesHandAngle);
  const lineMY = clockY + (radius - 25) * Math.sin(minutesHandAngle);
  ctx.lineTo(lineMX, lineMY);
  ctx.strokeStyle = "blue";
  ctx.stroke();
  if (s == 0) {
    minutesHandAngle += Math.PI / 30;
  }

  //hour hand needle
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  const lineHX = clockX + (radius - 50) * Math.cos(hoursHandlAngle);
  const lineHY = clockY + (radius - 50) * Math.sin(hoursHandlAngle);
  ctx.lineTo(lineHX, lineHY);
  ctx.strokeStyle = "green";
  ctx.stroke();
  if (m == 0 && s == 0) {
    hoursHandlAngle += Math.PI / 6;
  }
  secondsHandAngle += Math.PI / 30;
}, 1000);

/* setting alarm feature */

const createOption = (element, optionsArray) => {
  for (const op of optionsArray) {
    const option = document.createElement("option");
    option.innerHTML = op % 10 === op ? "0" + op : op;
    element.appendChild(option);
  }
};

const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const meridian = document.querySelector(".meredian");

hours.firstChild.innerHTML = new Date().getHours();
minutes.firstChild.innerHTML = new Date().getMinutes();
seconds.firstChild.innerHTML = new Date().getSeconds();

const hoursRange = Array.from({ length: 12 }, (_, index) => index);
const minutesSecRange = Array.from({ length: 60 }, (_, index) => index);

createOption(hours, hoursRange);
createOption(minutes, minutesSecRange);
createOption(seconds, minutesSecRange);

const handleWarning = (message) => {
  popupEl.innerHTML = `<span> ${message} <span>`;
  popupEl.classList.add('show','warning');
  setTimeout(() => {
    popupEl.classList.remove('show');
  }, 2000)
}

const getFormat = (num) => {
  if(parseInt(num / 10) === 0) return '0'+num;
  else return num;
}

const handleAlarmSave = () => {
  let h = +hours.value;
  const m = +minutes.value;
  const s = +seconds.value;
  const md = meridian.value;
  if(hours.value === 'HH' || minutes.value == 'MM' || seconds.value == 'SS') {
    handleWarning('Please fill all required values!');
    return;
  }
  if (md === "PM") h += 12;
  const alarmTime = new Date();
  alarmTime.setHours(h);
  alarmTime.setMinutes(m);
  alarmTime.setSeconds(s);

  if(new Date(alarmTime).getTime() < new Date().getTime()) {
    handleWarning('Time has passed.')
    return;
  }else{
    popupEl.innerHTML = `<span> Alarm set for time ${getFormat(h)}:${getFormat(m)}:${getFormat(s)}:${md}<span>`;
    popupEl.classList.remove('warning')
    popupEl.classList.add('show');
    heading.innerHTML = `Alarm set for time`
    setAlarmDiv.classList.add('none')
    submitBtn.classList.add('none')
    ringingAlarmDiv.classList.remove('none')
    setTimeout(() => {
      popupEl.classList.remove('show')
    }, 2000)
  }
  sessionStorage.setItem("alarmTime", alarmTime);
  popupEl.classList.remove('none')
};
