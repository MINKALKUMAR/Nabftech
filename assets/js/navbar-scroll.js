// Navbar background color on scroll
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.main-header'); // Change this if your navbar uses a different class
  if (window.scrollY > 10) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});
