function toggleCh(header) {
    const body = header.nextElementSibling;
    const tog = header.querySelector('.ch-tog');
    const isOpen = body.classList.contains('open');
    body.classList.toggle('open', !isOpen);
    tog.textContent = isOpen ? '+' : '−';
}
function toggleFaq(header) {
  const body = header.nextElementSibling;
  const tog = header.querySelector('.faq-tog');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  tog.textContent = isOpen ? '+' : '−';
}

function openFab() {
  document.getElementById('fab-open').parentElement.style.display = 'none';
  document.getElementById('fab-card').classList.add('open');
}

function closeFab() {
  document.getElementById('fab-card').classList.remove('open');
  document.getElementById('fab-open').parentElement.style.display = 'block';
}


function updateActiveNav(targetId) {
    const topLinks = document.querySelectorAll('.nav-links > a, .nav-dropdown > a');
    topLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (targetId === '#about-731chapters') {
        const aboutLink = document.querySelector('.nav-links > a[href="#about-731chapters"]');
        if (aboutLink) aboutLink.classList.add('active');
    } else if (targetId === '#musim' || targetId.startsWith('#')) {
        const musimLink = document.querySelector('.nav-drop-toggle');
        if (musimLink) musimLink.classList.add('active');
    }
}

function showFanzineDocumentation(event) {
    if (event) event.preventDefault();
    const page = document.querySelector('.page[id="musim"]');
    const about = document.querySelector('.page[id="about-731chapters"]');
    if (page) {
        page.classList.remove('hidden');
    }
    if (about) {
        about.classList.add('hidden');
    }

    updateActiveNav('#musim');
    window.history.replaceState(null, '', '#musim');
}

function showAbout(event) {
    if (event) event.preventDefault();

    const page = document.querySelector('.page[id="musim"]');
    const about = document.querySelector('.page[id="about-731chapters"]');   

    if (about) {
        about.classList.remove('hidden');
    }

    if (page) {
        page.classList.add('hidden');
    }

    updateActiveNav('#about-731chapters');
    window.history.replaceState(null, '', '#about-731chapters');

    const target = document.querySelector('#about-731chapters');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const page = document.querySelector('.page[id="musim"]');
    const about = document.querySelector('.page[id="about-731chapters"]');
    
    const currentHash = window.location.hash;
    
    if (currentHash === '#musim' || (currentHash && document.querySelector(currentHash) && document.querySelector(currentHash).closest('.page[id="musim"]'))) {
        if (page) page.classList.remove('hidden');
        if (about) about.classList.add('hidden');
        updateActiveNav('#musim');
        
        setTimeout(() => {
            const targetSec = document.querySelector(currentHash);
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    } else {
        if (page && about) {
            page.classList.add('hidden');
            about.classList.remove('hidden');
        }
        updateActiveNav('#about-731chapters');
    }
    
    const aboutLink = document.querySelector('a[href="#about-731chapters"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', showAbout);
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                event.preventDefault();
                
                if (href === '#about-731chapters') {
                    showAbout(event);
                } else {
                    if (page) page.classList.remove('hidden');
                    if (about) about.classList.add('hidden');
                    
                    updateActiveNav('#musim');
                    window.history.replaceState(null, '', href);
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        });
    });

    const navDropdown = document.querySelector('.nav-dropdown');
    let dropdownCloseTimeout = null;

    if (navDropdown) {
        navDropdown.addEventListener('mouseenter', () => {
            clearTimeout(dropdownCloseTimeout);
            navDropdown.classList.add('open');
        });

        navDropdown.addEventListener('mouseleave', () => {
            dropdownCloseTimeout = setTimeout(() => {
                navDropdown.classList.remove('open');
            }, 250);
        });
    }

    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            siteNav.classList.toggle('open');
        });
    }

    const submenuTitle = document.querySelector('.nav-submenu-title');
    if (submenuTitle) {
        submenuTitle.addEventListener('click', (event) => {
            if (window.innerWidth <= 600) {
                event.preventDefault();
                const group = submenuTitle.parentElement;
                if (group) {
                    group.classList.toggle('open');
                }
            }
        });
    }

    const responsiveLinks = document.querySelectorAll('.nav-links a');
    responsiveLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 600 && siteNav && siteNav.classList.contains('open')) {
                siteNav.classList.remove('open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});