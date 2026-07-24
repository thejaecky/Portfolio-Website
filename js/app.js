/*=========================================
        PREMIUM PORTFOLIO JAVASCRIPT
=========================================*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /*=========================================
            HEADER SCROLL EFFECT
    =========================================*/

    var header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /*=========================================
            NAVIGASI - ACTIVE LINK
    =========================================*/

    var navLinks = document.querySelectorAll('nav a:not(.nav-hire)');
    var sections = document.querySelectorAll('section[id]');

    function resetAllActive() {
        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });
    }

    function updateActiveLink() {
        var current = '';
        var scrollY = window.scrollY + 120;

        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.clientHeight;

            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });

        if (window.scrollY < 100) {
            current = 'home';
        }

        resetAllActive();

        navLinks.forEach(function(link) {
            var href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    /*=========================================
            SMOOTH SCROLL
    =========================================*/

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();

                resetAllActive();
                this.classList.add('active');

                var headerHeight = document.getElementById('header').offsetHeight + 20;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                var navMenu = document.getElementById('navMenu');
                var menuToggle = document.getElementById('menuToggle');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    /*=========================================
            KLIK LOGO KE HOME
    =========================================*/

    var logoHome = document.getElementById('logoHome');

    if (logoHome) {
        logoHome.addEventListener('click', function(e) {
            e.preventDefault();

            var homeSection = document.getElementById('home');
            if (homeSection) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });

                var homeLink = document.querySelector('nav a[href="#home"]');
                if (homeLink) {
                    homeLink.classList.add('active');
                }

                var headerHeight = document.getElementById('header').offsetHeight + 20;
                var targetPosition = homeSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                var navMenu = document.getElementById('navMenu');
                var menuToggle = document.getElementById('menuToggle');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    menuToggle.classList.remove('active');
                }

                setTimeout(function() {
                    updateActiveLink();
                }, 800);
            }
        });
    }

    /*=========================================
            TYPING ANIMATION - HOME (LOOPING)
    =========================================*/

    var words = ['Web Developer', 'UI/UX Designer', 'Graphic Designer', '3D Modeler', 'Petroleum Engineer'];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingElement = document.getElementById('typingText');

    function typeEffect() {
        if (!typingElement) return;

        var currentWord = words[wordIndex];
        var currentText = currentWord.substring(0, charIndex);
        typingElement.textContent = currentText;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 60);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            var delay = isDeleting ? 1500 : 500;
            setTimeout(typeEffect, delay);
        }
    }

    if (typingElement) {
        setTimeout(typeEffect, 500);
    }

    /*=========================================
            SCROLL ANIMATION - FADE UP (LOOPING)
    =========================================*/

    var scrollElements = document.querySelectorAll('.scroll-fade-up');

    if (scrollElements.length > 0) {
        var scrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('active');
                    void entry.target.offsetWidth;
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, { threshold: 0.15 });

        scrollElements.forEach(function(el) {
            scrollObserver.observe(el);
        });
    }

    /*=========================================
            COUNTER ANIMATION - LOOPING
    =========================================*/

    var statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-count'));
        var current = 0;
        var increment = Math.ceil(target / 50);
        var stepTime = 30;

        element.textContent = '0';

        var counter = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
                setTimeout(function() {
                    resetAndAnimateCounter(element);
                }, 3000);
            }
            element.textContent = current + '+';
        }, stepTime);
    }

    function resetAndAnimateCounter(element) {
        var target = parseInt(element.getAttribute('data-count'));
        var current = 0;
        var increment = Math.ceil(target / 50);
        var stepTime = 30;

        element.textContent = '0';

        var counter = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
                setTimeout(function() {
                    resetAndAnimateCounter(element);
                }, 3000);
            }
            element.textContent = current + '+';
        }, stepTime);
    }

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var element = entry.target;
                element.textContent = '0';
                animateCounter(element);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(function(el) {
        counterObserver.observe(el);
    });

    /*=========================================
            MOBILE MENU
    =========================================*/

    var menuToggle = document.getElementById('menuToggle');
    var navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        });
    }

    /*=========================================
            MOUSE PARALLAX
    =========================================*/

    var heroCard = document.getElementById('heroCard');

    if (heroCard) {
        document.addEventListener('mousemove', function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 16;
            var y = (e.clientY / window.innerHeight - 0.5) * 16;
            heroCard.style.transform = 'rotateY(' + x + 'deg) rotateX(' + (-y) + 'deg)';
        });
    }

    /*=========================================
            BUTTON RIPPLE
    =========================================*/

    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            var rect = btn.getBoundingClientRect();
            var ripple = document.createElement('span');
            ripple.className = 'ripple';
            var size = Math.max(rect.width, rect.height);
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });

    /*=========================================
            FORM SUBMIT - FORMSPREE
    =========================================*/

    var form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var btn = form.querySelector('button');
            var originalText = btn.innerHTML;

            // ===== GANTI DENGAN ENDPOINT FORMSPREE ANDA =====
            // Daftar gratis di: https://formspree.io/
            var formspreeUrl = 'https://formspree.io/f/xgogngww';

            var formData = new FormData(form);

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    form.reset();
                } else {
                    btn.innerHTML = '<i class="fas fa-times"></i> Error! Try Again';
                    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                }
            })
            .catch(function(error) {
                btn.innerHTML = '<i class="fas fa-times"></i> Error! Try Again';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            })
            .finally(function() {
                setTimeout(function() {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    /*=========================================
            DOWNLOAD CV
    =========================================*/

    var downloadCV = document.getElementById('downloadCV');
    if (downloadCV) {
        downloadCV.addEventListener('click', function(e) {
            var fileUrl = this.getAttribute('href');
            if (fileUrl === '#' || !fileUrl) {
                e.preventDefault();
                alert('File CV belum tersedia.');
            }
        });
    }

    /*=========================================
            DOWNLOAD PORTFOLIO
    =========================================*/

    var downloadPortfolio = document.getElementById('downloadPortfolioNav');
    if (downloadPortfolio) {
        downloadPortfolio.addEventListener('click', function(e) {
            var fileUrl = this.getAttribute('href');
            if (fileUrl === '#' || !fileUrl) {
                e.preventDefault();
                alert('File Portfolio belum tersedia.');
            }
        });
    }

});