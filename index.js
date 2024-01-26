const hours = document.querySelector('.hours');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs')

const hoursInput = document.querySelector("input[name='hours']")
const minutesInput = document.querySelector("input[name='minutes']")
const secondsInput = document.querySelector("input[name='seconds']");




const interval = setInterval(() => {
    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    hours.innerText = h;
    mins.innerText = m;
    const date = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), h,m,s)

    if(s % 10 == s) {
        secs.innerText = 0 + "" + s;
    }else{
        secs.innerText = s
    }
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