'use strict';

///////////////////////////////////////
// Modal window
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) { return btn.addEventListener('click', openModal) });

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});





//PAGE NAVIGATION
document.querySelector('.nav__links').addEventListener('click', function (e) {

  e.preventDefault();





  if (e.target.classList.contains('nav__link')) {
    //console.log(e.target);
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

  }
});


//Tabbed component


tabsContainer.addEventListener('click', function (e) {


  const clicked = e.target.closest('.operations__tab');


  if (!clicked) return;

  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  })
  tabsContent.forEach(function (c) {
    c.classList.remove('operations__content--active');
  })

  clicked.classList.add('operations__tab--active');


  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


})


//MEnu Fade Animation


const handleHover = function (e, opacity) {

  if (e.target.classList.contains('nav__link')) {

    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {

      if (el !== link) {
        el.style.opacity = opacity;
        logo.style.opacity = opacity;
      }

    })
  }

}

nav.addEventListener('mouseover', function (e) { handleHover(e, 0.5) });

nav.addEventListener('mouseout', function (e) { handleHover(e, 1) });


const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
  else {
    nav.classList.remove('sticky');
  }

}


const headerObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: '-90px' })
headerObserver.observe(header);

//////
const allSections = document.querySelectorAll('.section');


const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
}

const sectionObserver = new IntersectionObserver(revealSection, { root: null, transform: 0.50 })

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//LAZY LOADING

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')

  })

}
const imgObserver = new IntersectionObserver(loadImg, { root: null, threshold: 0, rootMargin: '200px' });

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});


//// slider

/*
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';
*/

const slides = document.querySelectorAll('.slide');
slides.forEach(function (s, i) {
  s.style.transform = `translateX(${100 * i})`;
});






/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
};
const obsOption = { root: null, threshold: [0, 0.2] }


const observer = new IntersectionObserver(obsCallback, obsOption)
observer.observe(section1);


const h1 = document.querySelector('h1');
//going downwards
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.closest('.header').style.background = 'grey';


//going sideways
console.log(h1.previousElementSibling);





const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', function (e) {
  alert('addEvenTListner: great');
});

//
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV LINK');
  console.log(e.target);
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV LINKS');
  console.log(e.target);

})

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV');
  console.log(e.target);

})






const header = document.querySelector('.header');
console.log(document.head);
console.log(document.body);
const allSections = document.querySelectorAll('.section');
console.log(allSections);

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
});

//styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';


document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
*/

