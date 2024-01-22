const hours = document.querySelector('.hours');
const mins = document.querySelector('.mins');
const secs = document.querySelector('.secs')

setInterval(() => {
    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds()
    hours.innerText = h;
    mins.innerText = m;
    if(s % 10 == s) {
        secs.innerText = 0 + "" + s;
    }else{
        secs.innerText = s
    }
}, 1000)