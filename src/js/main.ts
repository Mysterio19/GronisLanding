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

// Added class for header when scroll after section 

const darkSections = document.querySelectorAll<HTMLElement>('[data-section="dark"]');
const header = document.querySelector<HTMLElement>('header');

if (darkSections.length > 0) { 
  function updateHeaderClass() {
    if (!header) return;

    let isClassAdded = false;

    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      
      if (rect.top < 0 && rect.bottom > 0) {
        header.classList.remove('white');
        isClassAdded = false;
      } else if (rect.bottom < 0) {
        header.classList.add('white');
        isClassAdded = true; 
      }
    });

    if (!isClassAdded) {
      header.classList.remove('white');
    }
  }

  window.addEventListener('scroll', updateHeaderClass);
  updateHeaderClass();
  window.addEventListener('resize', updateHeaderClass);
}

// Deleted header height when scroll to anchor

window.addEventListener('DOMContentLoaded', () => {
  const headerHeight = header ? header.offsetHeight : 0;

  function scrollToAnchor() {
    const anchorId = window.location.hash;
    if (anchorId) {
      const targetElement = document.querySelector(anchorId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight,
          behavior: 'smooth'
        });
      }
    }
  }

  window.addEventListener('hashchange', scrollToAnchor);
  window.addEventListener('load', scrollToAnchor);
});

// Remove anchor when we reloaded page

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
});

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

const options = { threshold: [0.2] };
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

if (paginationItems.length === 0) { /* empty */ } else {
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goToPrevPage(): void {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
      updatePaginationButtons();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goToPage(page: number): void {
    currentPage = page;
    showPage(currentPage);
    updatePaginationButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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


// For sticky policy sitbar

window.addEventListener('scroll', () => {
  const navBox = document.querySelector('.nav-box') as HTMLElement | null; 
  const policyBlock = document.querySelector('.policy-content') as HTMLElement;

  if (navBox) {
    const stickyClass = 'is-sticky';
    const policyBlockOffset = policyBlock.getBoundingClientRect().top + window.scrollY;
    const policyBlockHeight = policyBlock.offsetHeight;
    const stickyOffset = policyBlockOffset - 180; 
    const unstickOffset = policyBlockOffset + policyBlockHeight; 

    if (window.pageYOffset > stickyOffset && window.pageYOffset < unstickOffset) {
      navBox.classList.add(stickyClass);
    } else {
      navBox.classList.remove(stickyClass);
    }
  }
});

// For generate nav menu policy

function addNavItem() {
  const navBox = document.querySelector('.nav-box') as HTMLUListElement;

  if (!navBox) return; // Check if nav-box exists

  const policyBoxes = document.querySelectorAll('.policy-box');
  navBox.innerHTML = '';

  policyBoxes.forEach((box, index) => {
      const titleElement = box.querySelector('.policy-title') as HTMLElement;
      const titleText = titleElement ? titleElement.textContent : 'Untitled';

      let id = box.id;
      if (!id) {
          id = `policy-${index + 1}`;
          box.id = id;
      }

      const navItem = document.createElement('li');
      navItem.className = 'nav-item';

      const navLink = document.createElement('a');
      navLink.className = 'nav-link';
      navLink.href = `#${id}`;
      navLink.textContent = titleText;

      navItem.appendChild(navLink);
      navBox.appendChild(navItem);
  });

  function handleScroll() {
      const scrollPosition = window.scrollY + 190;

      policyBoxes.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top + window.scrollY;
          // @ts-ignore
          if (scrollPosition >= boxTop && scrollPosition < boxTop + box.offsetHeight) {
              box.classList.add('active');

              const navLink = navBox.querySelector(`.nav-link[href="#${box.id}"]`) as HTMLElement;
              const navItem = navLink?.parentElement as HTMLElement;

              if (navItem) {
                  navItem.classList.add('active');
              }
          } else {
              box.classList.remove('active');
              const navLink = navBox.querySelector(`.nav-link[href="#${box.id}"]`) as HTMLElement;
              const navItem = navLink?.parentElement as HTMLElement;
              
              if (navItem) {
                  navItem.classList.remove('active');
              }
          }
      });
  }

  window.addEventListener('scroll', handleScroll);

  navBox.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('nav-link')) {
        event.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId!);

        if (targetElement) {
            const offset = window.innerWidth <= 1023 ? 100 : 180; 
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addNavItem();
});








