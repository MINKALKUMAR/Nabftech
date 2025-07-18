// Unified main.js for NBFC Summit
// Features: sticky/responsive navbar, mobile toggle, smooth scroll, Swiper sliders, Magnific Popup, AJAX form, Isotope filtering, WOW.js, and scroll effects.

;(($) => {
  // 2. Mobile Menu Toggle
  $(document).ready(() => {
    var menuToggle = document.querySelector(".mobile-menu-toggle")
    var nav = document.querySelector(".main-nav")
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active")
      })
      // Close menu on link click
      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("active")
        })
      })
    }
  })

  // 3. Smooth Scroll for Anchor Links
  $('a[href^="#"]').on("click", function (event) {
    if (this.hash !== "" && $(this.hash).length) {
      event.preventDefault()
      var hash = this.hash
      var headerHeight = $(".header").outerHeight()
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - headerHeight,
        },
        800,
      )
    }
  })

  // 4. Swiper Sliders (Banner, Testimonial, Team, etc.)
  const Swiper = window.Swiper // Declare Swiper variable
  if (Swiper) {
    $(".thm-swiper__slider").each(function () {
      var options = $(this).data("swiper-options")
      if (options) {
        new Swiper(this, options)
      }
    })
    // Add your specific Swiper initializations here if needed
  }

  // 5. Magnific Popup (Images & Videos)
  if ($.fn.magnificPopup) {
    $(".popup-image").magnificPopup({ type: "image", gallery: { enabled: true } })
    $(".popup-video").magnificPopup({ type: "iframe" })
  }

  // 6. AJAX Contact Form
  var form = $("#contact-form")
  var formMessages = $(".ajax-response")
  if (form.length && formMessages.length) {
    form.submit((e) => {
      e.preventDefault()
      var formData = form.serialize()
      $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: formData,
      })
        .done((response) => {
          formMessages.removeClass("error").addClass("success").text(response)
          $("#contact-form input,#contact-form textarea").val("")
        })
        .fail((data) => {
          formMessages.removeClass("success").addClass("error")
          if (data.responseText !== "") {
            formMessages.text(data.responseText)
          } else {
            formMessages.text("An error occurred. Please try again.")
          }
        })
    })
  }

  // 7. Isotope Filtering (if used)
  const Isotope = window.Isotope // Declare Isotope variable
  if (Isotope) {
    $(".masonary-layout").isotope({ layoutMode: "masonry" })
    $(".post-filter li .filter-text").on("click", function () {
      var selector = $(this).parent().attr("data-filter")
      $(".post-filter li").removeClass("active")
      $(this).parent().addClass("active")
      $(".filter-layout").isotope({ filter: selector })
      return false
    })
    // Dynamic filter counter
    $(".post-filter.has-dynamic-filters-counter li").each(function () {
      var filterElement = $(this).data("filter")
      var count = $(".filter-layout").find(filterElement).length
      $(this)
        .children(".filter-text")
        .append('<span class="count">' + count + "</span>")
    })
  }

  // 9. Odometer Animation
  if ($.fn.appear) {
    $(".odometer").appear(() => {
      var odo = $(".odometer")
      odo.each(function () {
        var countNumber = $(this).attr("data-count")
        $(this).html(countNumber)
      })
    })
  }

  // 10. Team Hover Effects (if used)
  const teamLink = document.querySelectorAll(".team-two__single-title")
  const teamLinkHoverReveal = document.querySelectorAll(".team-two__single-img")
  const teamLinkImages = document.querySelectorAll(".team-two__single-img-hover")
  for (let i = 0; i < teamLink.length; i++) {
    teamLink[i].addEventListener("mousemove", (e) => {
      teamLinkHoverReveal[i].style.opacity = 1
      teamLinkHoverReveal[i].style.transform = `translate(150%, -50% ) rotate(5deg)`
      teamLinkImages[i].style.transform = "scale(1, 1)"
      teamLinkHoverReveal[i].style.left = e.clientX + "px"
    })
    teamLink[i].addEventListener("mouseleave", (e) => {
      teamLinkHoverReveal[i].style.opacity = 0
      teamLinkHoverReveal[i].style.transform = `translate(-50%, -50%) rotate(-5deg)`
      teamLinkImages[i].style.transform = "scale(0.8, 0.8)"
    })
  }

  /*=============================================
    = Preloader
    ===============================================*/
  function preloader() {
    $("#preloader").delay(0).fadeOut()
  }

  /*=============================================
    = Swiper Slider
    ===============================================*/
  function thmSwiperInit() {
    const swiperElm = document.querySelectorAll(".thm-swiper__slider")
    swiperElm.forEach((swiperelm) => {
      const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions)
      const thmSwiperSlider = new window.Swiper(swiperelm, swiperOptions)
    })
  }

  /*=============================================
    = Banner Slider
    ===============================================*/
  function BannerSliderInit() {
    if ($(".banner-slider-one")) {
      $(".banner-slider-one").each(function () {
        var $this = $(this)
        var $pagination = $this.find(".swiper-pagination")[0]
        var $next = $this.find(".swiper-button-next")[0]
        var $prev = $this.find(".swiper-button-prev")[0]
        new window.Swiper($this[0], {
          slidesPerView: 1,
          loop: true,
          effect: "fade",
          spaceBetween: 24,
          slideToClickedSlide: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          speed: 800,
          pagination: {
            el: $pagination,
            clickable: true,
            type: "bullets",
          },
          navigation: {
            nextEl: $next,
            prevEl: $prev,
          },
        })
      })
    }
  }

  /*=============================================
    = Testimonial Slider
    ===============================================*/
  function TestimonialSwiperInit() {
    if ($(".testimonial-carousel-one")) {
      $(".testimonial-carousel-one").each(function () {
        var $this = $(this)
        new window.Swiper($this[0], {
          slidesPerView: 2,
          loop: true,
          spaceBetween: 30,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          speed: 2000,
          pagination: {
            el: ".swiper-pagination-dots-line",
            clickable: true,
            type: "bullets",
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            0: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            375: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            575: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            992: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
            1200: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
          },
        })
      })
    }
  }

  /*=============================================
    = Testimonial Slider Two
    ===============================================*/
  function TestimonialSwiperInit2() {
    if ($(".testimonial-carousel-two")) {
      $(".testimonial-carousel-two").each(function () {
        var $this = $(this)
        new window.Swiper($this[0], {
          slidesPerView: 2,
          loop: true,
          spaceBetween: 30,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          speed: 2000,
          pagination: {
            el: ".swiper-pagination-dots-line",
            clickable: true,
            type: "bullets",
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            0: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            375: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            575: {
              spaceBetween: 30,
              slidesPerView: 1,
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
            992: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
            1200: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
          },
        })
      })
    }
  }

  /*=============================================
    = Team Slider
    ===============================================*/
  function TeamCarouselSwiperInit() {
    if ($(".team-carousel-slider")) {
      $(".team-carousel-slider").each(function () {
        var $this = $(this)
        new window.Swiper($this[0], {
          slidesPerView: 2,
          loop: false,
          spaceBetween: 30,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          speed: 2000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            0: {
              spaceBetween: 0,
              slidesPerView: 1,
            },
            375: {
              spaceBetween: 0,
              slidesPerView: 1,
            },
            575: {
              spaceBetween: 0,
              slidesPerView: 1,
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
            992: {
              spaceBetween: 30,
              slidesPerView: 4,
            },
            1200: {
              spaceBetween: 30,
              slidesPerView: 4,
            },
          },
        })
      })
    }
  }

  $(window).on("load", () => {
    preloader()
    BannerSliderInit()
    TestimonialSwiperInit()
    TestimonialSwiperInit2()
    TeamCarouselSwiperInit()
    projectMasonaryLayout()
    thmSwiperInit()
  })

  /*=============================================
    = Mobile Menu
    =============================================*/
  //SubMenu Dropdown Toggle
  if ($(".menu-area li.menu-item-has-children ul").length) {
    $(".menu-area .navigation li.menu-item-has-children").append(
      '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>',
    )
  }

  //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    var mobileMenuContent = $(".menu-area .main-menu").html()
    $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent)

    //Dropdown Button
    $(".mobile-menu li.menu-item-has-children .dropdown-btn").on("click", function () {
      $(this).toggleClass("open")
      $(this).prev("ul").slideToggle(300)
    })
    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", () => {
      $("body").addClass("mobile-menu-visible")
    })

    //Menu Toggle Btn
    $(".menu-backdrop, .mobile-menu .close-btn").on("click", () => {
      $("body").removeClass("mobile-menu-visible")
    })
  }

  /*=============================================
    = Menu sticky & Scroll to top
    =============================================*/
  $(window).off("scroll") // Remove the sticky navbar scroll event listener
  /*=============================================
    = Scroll Up
    =============================================*/
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target")
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000,
      )
    })
  }

  /*=============================================
    = Odometer Active
    =============================================*/
  $(".odometer").appear((e) => {
    var odo = $(".odometer")
    odo.each(function () {
      var countNumber = $(this).attr("data-count")
      $(this).html(countNumber)
    })
  })

  /*=============================================
    = Magnific Popup
    =============================================*/
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  })

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  })

  /*=============================================
    = Search Toggler
    =============================================*/
  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", (e) => {
      e.preventDefault()
      $(".search-popup").toggleClass("active")
      $(".mobile-nav__wrapper").removeClass("expanded")
      $("body").toggleClass("locked")
    })
  }

  /*=============================================
    = Team Social Active
    =============================================*/
  $(".social-toggle-icon").on("click", function () {
    $(this).parent().find("ul").slideToggle(400)
    $(this).find("i").toggleClass("icon-close")
  })

  /*=============================================
    = Project Two
    =============================================*/
  function projectMasonaryLayout() {
    if ($(".masonary-layout").length) {
      $(".masonary-layout").isotope({
        layoutMode: "masonry",
      })
    }
    if ($(".post-filter").length) {
      $(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this)
          var selector = Self.parent().attr("data-filter")
          $(".post-filter li").removeClass("active")
          Self.parent().addClass("active")
          $(".filter-layout").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false,
            },
          })
          return false
        })
    }

    if ($(".post-filter.has-dynamic-filters-counter").length) {
      var activeFilterItem = $(".post-filter.has-dynamic-filters-counter").find("li")
      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter")
        var count = $(".filter-layout").find(filterElement).length
        $(this)
          .children(".filter-text")
          .append('<span class="count">' + count + "</span>")
      })
    }
  }

  /*=============================================
    = Accrodion
    =============================================*/
  if ($(".accrodion-grp").length) {
    var accrodionGrp = $(".accrodion-grp")
    accrodionGrp.each(function () {
      var accrodionName = $(this).data("grp-name")
      var Self = $(this)
      var accordion = Self.find(".accrodion")
      Self.addClass(accrodionName)
      Self.find(".accrodion .accrodion-content").hide()
      Self.find(".accrodion.active").find(".accrodion-content").show()
      // Use event delegation so clicking anywhere in the title (including icon) works
      Self.on('click', '.accrodion-title', function () {
        if ($(this).parent().hasClass("active") === false) {
          $(".accrodion-grp." + accrodionName)
            .find(".accrodion")
            .removeClass("active")
          $(".accrodion-grp." + accrodionName)
            .find(".accrodion")
            .find(".accrodion-content")
            .slideUp()
          $(this).parent().addClass("active")
          $(this).parent().find(".accrodion-content").slideDown()
        }
      })
    })
  }

  /*=============================================
    = Isotope Active
    =============================================*/
  $(".grid").imagesLoaded(() => {
    // init Isotope
    var $grid = $(".grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: ".grid-item",
      },
    })
    // filter items on button click
    $(".portfolio-menu").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter")
      $grid.isotope({ filter: filterValue })
    })
  })

  //for menu active class
  $(".product-license li").on("click", function (event) {
    $(this).siblings(".active").removeClass("active")
    $(this).addClass("active")
    event.preventDefault()
  })

  /*=============================================
    = Img Popup
    =============================================*/
  if ($(".img-popup").length) {
    var imgGroups = {}
    $(".img-popup").each(function () {
      var id = Number.parseInt($(this).attr("data-group"), 10)

      if (!imgGroups[id]) {
        imgGroups[id] = []
      }

      imgGroups[id].push(this)
    })

    $.each(imgGroups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true,
        },
      })
    })
  }

  /*=============================================
    = Wow Active
    =============================================*/

  $(document).ready(() => {
    // Smooth scroll for navigation links
    $('a[href^="#"]').on("click", function (event) {
      // Check if the link is an internal anchor and the target element exists
      if (this.hash !== "" && $(this.hash).length) {
        event.preventDefault()
        var hash = this.hash
        var headerHeight = $(".header").outerHeight() // Get dynamic header height

        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top - headerHeight, // Adjust for fixed header
          },
          800,
        ) // Smooth scroll duration
      }
    })
  })
  // --- END: All features ---
})(window.jQuery)
