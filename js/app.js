const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.post');
hiddenElements.forEach((el) => observer.observe(el));



const carrusel = document.querySelector(".carrusel-items");
const carruselItems = carrusel.querySelectorAll(".carrusel-item");
const firstImage = carrusel.querySelector(".carrusel-item:first-child");
let numImages = carruselItems.length;
let clonedImages = [];

for (let i = 0; i < numImages; i++) {
    clonedImages[i] = carruselItems[i].cloneNode(true);
    carrusel.appendChild(clonedImages[i]);
}

let intervalo = null;
let step = 1.2;
const start = () => {
    intervalo = setInterval(function () {
        carrusel.scrollLeft += step;
        if (carrusel.scrollLeft >= carrusel.scrollWidth - carrusel.clientWidth) {
            carrusel.scrollLeft = 0;
        }
    }, 10);
}

const stop = () => {
    clearInterval(intervalo);
};

carrusel.addEventListener('mouseover', () => {
    stop();
});

carrusel.addEventListener('mouseout', () => {
    start();
});

start();

carrusel.addEventListener('animationend', () => {
    carrusel.removeChild(clonedImages.shift());
    clonedImages.push(carruselItems[numImages - 1].cloneNode(true));
    carrusel.appendChild(clonedImages[numImages - 1]);
});