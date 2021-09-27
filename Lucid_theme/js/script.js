$(document).ready(function () {
  $(window).scroll(function() {
      if($(this).scrollTop())  /*height in pixels when the navbar becomes non opaque*/ 
      {
          $('.navbar').addClass('navbar__background-dark');
      } else {
          $('.navbar').removeClass('navbar__background-dark');
          $('.navbar-collapse').addClass('navbar__background-dark')
      }
  });

  $(".navbar-toggler").on("click", function() {
    $('.navbar').addClass('navbar__background-dark');
  });

  $(".nav-item").on("click", function() {
    $('.navbar-collapse').removeClass('show');
  });

  $(".nav-item").hover(function() {
    $(this).find(".link__decor").addClass("active");
  }, function() {
    $(this).find(".link__decor").removeClass("active");
  });

  if ($(window).width() > 1199) {
    $(".contacts__form-body").addClass("no-gutters")
  }

  $(window).resize(function() {
    if ($(window).width() > 1199) {
      $(".contacts__form-body").addClass("no-gutters")
    } else $(".contacts__form-body").removeClass("no-gutters")
});

console.log($(window).width())
  $(".price__item").hover(function() {
    $(this).find(".price__item-header").addClass("text-primary");
    $(this).find(".card-body").addClass(["bg-primary", "text-white"]);
    $(this).find(".price__number-text").addClass("text-white");
    $(this).find(".price__link").addClass("active");
  }, function() {
    $(this).find(".price__item-header").removeClass("text-primary");
    $(this).find(".card-body").removeClass(["bg-primary", "text-white"]);
    $(this).find(".price__number-text").removeClass("text-white");
    $(this).find(".price__link").removeClass("active");
  });

  $(".testimonials__slider").slick({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      mobileFirst: true,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      zIndex: 10,
      responsive: [{
          breakpoint: 767.98,
          settings: {
            slidesToShow: 2,
            dots: true,
          },
        }
      ],
    });
});