/* eslint-disable no-inner-declarations */
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

// Header scroll

const header: HTMLElement | null = document.getElementById('header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
    }
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

// Scroll anim

document.addEventListener('DOMContentLoaded', () => {
  initAnimationOnScroll();
});
  
export const initAnimationOnScroll = () => {
const onEntry: IntersectionObserverCallback = (entry) => {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add('show');
    }
  });
};

const options = { threshold: [0.5] };
const observer = new IntersectionObserver(onEntry, options);
const elements = document.querySelectorAll('.anim');
for (const elm of elements) {
  observer.observe(elm);
}};

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

// Form file
const fileInput = document.getElementById('file-input');
const fileName = document.querySelector('.file-name');

if (fileInput) {
  fileInput.addEventListener('change', function() {
    // @ts-ignore
    if (fileInput.files.length > 0) {
      // @ts-ignore
      fileName.textContent = fileInput.files[0].name;
    }
  });
}

// For pagination

const itemsPerPage = 9;
const paginationItems: HTMLElement[] = Array.from(document.querySelectorAll('[data-pag-type="pag"]'));

if (paginationItems.length === 0) {
  console.log('No pagination items found. Exiting script.');
} else {
  let currentPage = 1;
  const totalPages = Math.ceil(paginationItems.length / itemsPerPage);

  function showPage(page: number): void {
    paginationItems.forEach((item) => (item.style.display = 'none'));

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    paginationItems.slice(start, end).forEach((item) => (item.style.display = 'block'));

    if (totalPages > 1) {
      updatePaginationNumbers();
    }
  }

  function updatePaginationButtons(): void {
    const prevButton = document.querySelector('#prevButton') as HTMLButtonElement;
    const nextButton = document.querySelector('#nextButton') as HTMLButtonElement;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  function updatePaginationNumbers(): void {
    const paginationNumbers = document.querySelector('#paginationNumbers') as HTMLElement;
    paginationNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i.toString();
      pageButton.className = 'page-number';

      if (i === currentPage) {
        pageButton.classList.add('active');
      }

      pageButton.addEventListener('click', () => goToPage(i));

      paginationNumbers.appendChild(pageButton);
    }
  }

  function goToNextPage(): void {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
      updatePaginationButtons();
    }
  }

  function goToPrevPage(): void {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
      updatePaginationButtons();
    }
  }

  function goToPage(page: number): void {
    currentPage = page;
    showPage(currentPage);
    updatePaginationButtons();
  }

  if (paginationItems.length > itemsPerPage) {
    showPage(currentPage);
    updatePaginationButtons();
    // @ts-ignore
    document.querySelector('.pagination')!.style.display = 'flex';

    const prevButton = document.querySelector('#prevButton') as HTMLButtonElement;
    const nextButton = document.querySelector('#nextButton') as HTMLButtonElement;

    prevButton.addEventListener('click', goToPrevPage);
    nextButton.addEventListener('click', goToNextPage);
  } else {
    // @ts-ignore
    document.querySelector('.pagination')!.style.display = 'none';
  }
}
