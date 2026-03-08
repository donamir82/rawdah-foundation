// Rawdah Foundation — Site Interactions

// ========== Navbar ==========
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-solid');
    } else {
        navbar.classList.remove('navbar-solid');
    }
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ========== Scroll Reveal ==========
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ========== Progress Bars ==========
const progressBars = document.querySelectorAll('.progress-bar');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            entry.target.style.width = width + '%';
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ========== Lightbox ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

const galleryImages = [
    { src: 'images/mosque-hero.jpg', caption: 'Completed Vision (3D Render)' },
    { src: 'images/mosque-front-view.jpg', caption: 'Current Progress — Front View' },
    { src: 'images/mosque-front-view-2.jpg', caption: 'Front View' },
    { src: 'images/mosque-construction-1.jpg', caption: 'Construction Phase' },
    { src: 'images/mosque-construction-2.jpg', caption: 'Foundation & Structure' },
    { src: 'images/mosque-roadside-view.jpg', caption: 'Roadside Location' },
    { src: 'images/mosque-location-map.jpg', caption: 'Location Map' },
];

let currentIndex = 0;

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        currentIndex = parseInt(item.dataset.index);
        showLightbox();
    });
});

function showLightbox() {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxCaption.textContent = galleryImages[currentIndex].caption;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e && e.target !== lightbox && e.target !== lightboxImg) return;
    if (!e || e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close button always works
document.querySelector('#lightbox > button:first-child').addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.classList.add('hidden');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

function prevImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showLightbox();
}

function nextImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showLightbox();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (e.key === 'ArrowLeft') prevImage(e);
    if (e.key === 'ArrowRight') nextImage(e);
});

// ========== Active Nav Highlight ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('text-white', 'font-bold');
                link.classList.add('text-white/80');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('text-white', 'font-bold');
                    link.classList.remove('text-white/80');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => navObserver.observe(section));
