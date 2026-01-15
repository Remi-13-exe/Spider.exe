const nextBtn = document.querySelector('.turn-page.next');
const prevBtn = document.querySelector('.turn-page.prev');
const doublePages = document.querySelectorAll('.journal-double-page');
let currentIndex = 0;

nextBtn.addEventListener('click', () => {
  if (currentIndex < doublePages.length) {
    const rightPage = doublePages[currentIndex].querySelector('.journal-page.right');
    rightPage.style.transform = 'rotateY(-180deg)';
    rightPage.style.zIndex = doublePages.length - currentIndex;
    currentIndex++;
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    const rightPage = doublePages[currentIndex].querySelector('.journal-page.right');
    rightPage.style.transform = 'rotateY(0deg)';
  }
});
