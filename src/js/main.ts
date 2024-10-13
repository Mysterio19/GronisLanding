document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.accordion-header') as HTMLElement;
        header.addEventListener('click', () => {
            // Закрытие всех других открытых элементов
            items.forEach(i => {
                if (i !== item && i.classList.contains('open')) {
                    i.classList.remove('open');
                }
            });

            // Переключение текущего элемента
            item.classList.toggle('open');
        });
    });
});
