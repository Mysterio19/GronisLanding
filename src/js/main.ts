// Header 

const burger = document.querySelector('.burger');
const linkClose = document.querySelectorAll('.link-close');
const overflow = document.querySelector('.overflow');

burger?.addEventListener('click', function () {
  document.body.classList.toggle('body_lock');
  document.body.classList.toggle('active');
});

overflow?.addEventListener('click', function () {
  document.body.classList.toggle('body_lock');
  document.body.classList.toggle('active');
});

for (let i = 0; i < linkClose.length; ++i) {
  linkClose[i].addEventListener('click', function () {
  document.body.classList.remove('body_lock');
  document.body.classList.remove('active');
  });
}


// Accordion 
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-header') as HTMLElement;
        header.addEventListener('click', () => {
            items.forEach(i => {
                if (i !== item && i.classList.contains('open')) {
                    i.classList.remove('open');
                }
            });

            item.classList.toggle('open');
        });
    });
});


// Swipers

// @ts-ignore
function destroySlidersOnResize(selector, width, obj, moreThan) {
  const init = {
    ...obj,
  };

  const win = window;
  const sliderSelector = document.querySelector(selector);
  // @ts-ignore
  let swiper = new Swiper(selector, init);

  const toggleInit = () => {
    const neededWidth = moreThan
      ? win.innerWidth >= width
      : win.innerWidth <= width;
    if (neededWidth) {
      if (!sliderSelector?.classList.contains("swiper-initialized")) {
        // @ts-ignore
        swiper = new Swiper(selector, init);
      }
    } else if (sliderSelector.classList.contains("swiper-initialized")) {
      swiper.destroy();
    }
  };

  ["load", "resize"].forEach((evt) =>
    win.addEventListener(evt, toggleInit, false)
  );
}

// @ts-ignore
destroySlidersOnResize(".productsSlider", 99999, {
  spaceBetween: 20,
  slidesPerView: 1,

  breakpoints: {
    0: {
      spaceBetween: 8,
    },
    768: {
      spaceBetween: 20,
    },
  },

  navigation: {
    prevEl: ".products-prev", 
    nextEl: ".products-next",
  },

  pagination: {
    el: ".products-pagination",
    type: "progressbar",
  },
});
