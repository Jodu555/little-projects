const clock = document.querySelector('#clock');
let previousType = '';

//TODO: Implement this too clock update:
// https://codesandbox.io/s/vanilla-js-text-transition-example-hc7kq?from-embed=&file=/src/index.js

updateClock();
setInterval(updateClock, 1000);

function getCurrentTimeType() {
    return document.querySelector('#time')?.classList.contains('active')
        ? 'Time'
        : document.querySelector('#date').classList.contains('active')
            ? 'Date'
            : '';
}

function updateClock() {
    const type = getCurrentTimeType();
    previousType = type;
    const fn = 'toLocale' + type + 'String';
    const time = new Date()[fn]();
    clock.innerHTML = time;
}

particlesJS.load('particles', 'particles.json', () => {
    console.log('callback - particles.js config loaded');
});

[...document.querySelectorAll('button:not(.active)')].forEach((btn) => {
    btn.addEventListener('click', () => {
        const type = getCurrentTimeType();
        if (btn.id !== type.toLowerCase()) {
            clock.style.opacity = '0%';
            setTimeout(() => {
                clock.style.opacity = '100%';
                updateClock();
            }, 350);
        }
    });
});

[...document.querySelectorAll('.button-group button')].forEach((btn) => {
    btn.addEventListener('click', () => {
        clearButtons();
        btn.classList.add('active');
    });
});

function clearButtons() {
    [...document.querySelectorAll('button.active')].forEach((btn) => {
        btn.classList.remove('active');
    });
}