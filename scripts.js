document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Function to toggle dark mode
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

    // Event listener for dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    } else {
        console.error('Dark mode toggle button element not found.');
    }

    // Ensure the page loads in light mode
    body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    document.querySelectorAll('.social-links a img').forEach(img => {
        img.classList.remove('invert-icon');
    });

    // Function to display slides
    function showSlides(n) {
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";

        // Update active dot
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        dots[slideIndex].classList.add("active");
    }

    // Function to move to next slide
    function nextSlide() {
        slideIndex++;
        showSlides(slideIndex);
    }

    // Function to move to previous slide
    function previousSlide() {
        slideIndex--;
        showSlides(slideIndex);
    }

    // Automatic slideshow
    function autoSlides() {
        slideIndex++;
        if (slideIndex >= slides.length) { slideIndex = 0; }
        showSlides(slideIndex);
        setTimeout(autoSlides, 2000); // Change image every 2.5 seconds
    }

    // Start automatic slideshow
    autoSlides();

    // Event listeners for previous and next buttons
    document.getElementById('prev').addEventListener('click', function() {
        previousSlide();
    });
    document.getElementById('next').addEventListener('click', function() {
        nextSlide();
    });

    // Event listeners for dot navigation
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function() {
            slideIndex = i;
            showSlides(slideIndex);
        });
    }
});