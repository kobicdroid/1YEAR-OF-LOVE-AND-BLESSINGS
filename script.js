/* ============================================
   ONE YEAR WITH MY MAE CHIKITO
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- Opening Screen ----------
    const openingScreen = document.getElementById('opening-screen');
    const openStoryBtn = document.getElementById('open-story-btn');
    const mainContent = document.getElementById('main-content');
    const particlesContainer = document.getElementById('particles');

    // Create floating particles & hearts
    function createParticles() {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            if (Math.random() > 0.7) p.classList.add('heart');
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 10 + 's';
            p.style.animationDuration = (8 + Math.random() * 10) + 's';
            particlesContainer.appendChild(p);
        }
    }
    createParticles();

    openStoryBtn.addEventListener('click', () => {
        openingScreen.classList.add('fade-out');
        setTimeout(() => {
            openingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            // Trigger first chapter animations if needed
            observeChapters();
        }, 1200);
    });

    // ---------- Music Player ----------
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (!bgMusic.src || bgMusic.src.endsWith('/')) {
            // No music file set – gentle reminder
            alert('Add your music file in the HTML (search for "ADD YOUR MUSIC HERE")');
            return;
        }
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('.music-text').textContent = 'Play Our Moment';
        } else {
            bgMusic.play().catch(() => {});
            musicToggle.classList.add('playing');
            musicToggle.querySelector('.music-text').textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    // ---------- Intersection Observer for Chapters ----------
    function observeChapters() {
        const chapters = document.querySelectorAll('.chapter, .gallery-section, .final-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.25 });

        chapters.forEach(ch => observer.observe(ch));
    }

    // ---------- Letter Envelope ----------
    const openLetterBtn = document.getElementById('open-letter-btn');
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letter-paper');

    openLetterBtn.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            letterPaper.classList.remove('hidden');
            // force reflow
            letterPaper.offsetHeight;
            letterPaper.classList.add('visible');
        }, 500);
    });

    // ---------- Gallery Lightbox ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const polaroids = document.querySelectorAll('.polaroid');

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', () => {
            const img = polaroid.querySelector('img');
            const caption = polaroid.querySelector('.polaroid-caption')?.textContent || '';
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.remove('hidden');
            // force reflow
            lightbox.offsetHeight;
            lightbox.classList.add('visible');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('visible');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
        }, 400);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // ---------- Secret Button ----------
    const secretBtn = document.getElementById('secret-btn');
    const secretReveal = document.getElementById('secret-reveal');
    const secretHearts = document.getElementById('secret-hearts');

    secretBtn.addEventListener('click', () => {
        secretReveal.classList.remove('hidden');
        // Create floating hearts
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-20px';
            heart.style.fontSize = (12 + Math.random() * 18) + 'px';
            heart.style.opacity = '0.8';
            heart.style.animation = `floatUp ${2 + Math.random() * 3}s ease-out forwards`;
            heart.style.animationDelay = Math.random() * 0.8 + 's';
            secretHearts.appendChild(heart);
        }
        // Add keyframes dynamically if not present
        if (!document.getElementById('floatUpKeyframes')) {
            const style = document.createElement('style');
            style.id = 'floatUpKeyframes';
            style.textContent = `
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0.9; }
                    100% { transform: translateY(-250px) scale(0.5); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        secretBtn.style.display = 'none';
    });

    // ---------- Smooth scroll for any internal links (future-proof) ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
