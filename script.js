document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').style.width = '250px';
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').style.width = '0';
});

document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('sidebar').style.width = '0';
    });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('slide-active');
        } else {
            slide.classList.remove('slide-active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const lightbox = document.querySelector('.lightbox');
        const lightboxContent = document.querySelector('.lightbox-content');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const closeBtn = document.querySelector('.lightbox .close');
        const prevBtn = document.querySelector('.lightbox .prev');
        const nextBtn = document.querySelector('.lightbox .next');
        
        // Clear previous content
        lightboxContent.innerHTML = '';
        
        // Show lightbox
        lightbox.style.display = 'block';

        // Display related images
        const galleryImages = item.querySelector('.lightbox-gallery').cloneNode(true).children;
        for (let i = 0; i < galleryImages.length; i++) {
            const img = document.createElement('img');
            img.src = galleryImages[i].src;
            img.alt = galleryImages[i].alt;
            img.style.width = '100%';
            img.style.height = '100%';
            lightboxContent.appendChild(img);
        }

        // Event listeners for lightbox navigation
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        prevBtn.addEventListener('click', () => {
            showImage(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            showImage(currentIndex + 1);
        });

        let currentIndex = 0;

        function showImage(index) {
            const images = lightboxContent.querySelectorAll('img');
            if (index < 0) {
                index = images.length - 1;
            } else if (index >= images.length) {
                index = 0;
            }
            currentIndex = index;
            for (let i = 0; i < images.length; i++) {
                images[i].style.display = 'none';
            }
            images[currentIndex].style.display = 'block';
            lightboxCaption.textContent = images[currentIndex].alt;
        }
        
        // Show the first image initially
        showImage(0);
    });
});
