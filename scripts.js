document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            document.querySelectorAll('.social-links a img').forEach(img => {
                img.classList.add('invert-icon');
            });
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            document.querySelectorAll('.social-links a img').forEach(img => {
                img.classList.remove('invert-icon');
            });
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    } else {
        console.error('Dark mode toggle button element not found.');
    }

    body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    document.querySelectorAll('.social-links a img').forEach(img => {
        img.classList.remove('invert-icon');
    });

    function showSlides(n) {
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";

        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        dots[slideIndex].classList.add("active");
    }

    function nextSlide() {
        slideIndex++;
        showSlides(slideIndex);
    }

    function previousSlide() {
        slideIndex--;
        showSlides(slideIndex);
    }

    function autoSlides() {
        slideIndex++;
        if (slideIndex >= slides.length) { slideIndex = 0; }
        showSlides(slideIndex);
        setTimeout(autoSlides, 2000); 
    }

    autoSlides();

    document.getElementById('prev').addEventListener('click', function() {
        previousSlide();
    });
    document.getElementById('next').addEventListener('click', function() {
        nextSlide();
    });

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function() {
            slideIndex = i;
            showSlides(slideIndex);
        });
    }
});