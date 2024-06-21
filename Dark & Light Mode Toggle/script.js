document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.querySelector('.dark-toggle');
    const body = document.body;

    darkToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
    });
});
