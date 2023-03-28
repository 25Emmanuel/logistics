const toggleButton = document.querySelector('#hamburger-menu-container'), toggleNav = document.querySelector('.link-container');
toggleButton.addEventListener('click', () => {
    toggleNav.classList.toggle ('link-holder')
});