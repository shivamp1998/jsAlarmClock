const hours = document.querySelector('.hours');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs')

const hoursInput = document.querySelector("input[name='hours']")
const minutesInput = document.querySelector("input[name='minutes']")
const secondsInput = document.querySelector("input[name='seconds']");


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
    const alarmTime = localStorage.getItem('alarmDate');
    if(alarmTime !== null && date.getTime() >= new Date(alarmTime).getTime()) {
        console.log('alarm is ringing')
    }else{
        console.log('alarm not ringing', date.getTime(), new Date(alarmTime).getTime())
    }
}, 1000)

const setAlarm = () => {
    const h = hoursInput.value;
    const m = minutesInput.value;
    const s = secondsInput.value;
    const date = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), h,m,s)
    localStorage.setItem('alarmDate', date)
}