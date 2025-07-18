// Scroll to Top Button functionality
// Adds a button that appears when the user scrolls down, and scrolls smoothly to top when clicked

document.addEventListener('DOMContentLoaded', function () {
    // Create the button element
    var btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.title = 'Go to top';
    // Use Font Awesome if loaded, else fallback to Unicode
    if (document.querySelector('link[href*="font-awesome"],link[href*="fontawesome"],link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"],link[href*="cdnjs.cloudflare.com/ajax/libs/fontawesome"]')) {
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    } else {
        btn.innerHTML = '&#x21E7;'; // Double upwards chevron
    }
    document.body.appendChild(btn);

    // Style the button (can be moved to CSS later)
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '30px';
    btn.style.width = '45px';
    btn.style.height = '45px';
    btn.style.background = '#007bff';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '10%';
    btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    btn.style.fontSize = '24px';
    btn.style.cursor = 'pointer';
    btn.style.display = 'none';
    btn.style.zIndex = '9999';
    btn.style.transition = 'opacity 0.3s';

    // Show/hide button on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            btn.style.display = 'block';
            btn.style.opacity = '1';
        } else {
            btn.style.opacity = '0';
            setTimeout(function () {
                if (window.scrollY <= 200) btn.style.display = 'none';
            }, 300);
        }
    });

    // Scroll to top on click
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
