var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // Add CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.05em solid #666666 }";
  document.body.appendChild(css);
}


$(document).ready(function () {
  // Add smooth scrolling to menu links
  $("a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  // Appear work one scroll
  // https://codepen.io/annalarson/pen/GesqK
  $(window).scroll(function () {
    // Check the location of each desired element
    $('.work-div').each(function (i) {
      var bottom_of_object = $(this).position().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      // If the object is completely visible in the window, fade it it
      if (bottom_of_window > bottom_of_object) {
        // To appear one after another
        var delayTime = 500 + (i * 500);
        $(this).animate({
          'opacity': '1'
        }, delayTime);
      }
    });
    // Change navbar background on scroll https://jsfiddle.net/wamosjk/ufhp9s15/
    $('nav, .logo, .nav-link').toggleClass('scrolled', $(this).scrollTop() > 50);
    //$('.navbar').toggleClass('bg-dark bg-light', $(this).scrollTop() < 50);
    $('.navbar').toggleClass('navbar-dark navbar-light', $(this).scrollTop() < 50);
  });
  // Function to set navbar margins
  function removeNavbarMargins() {
    // Check toggler icon status
    if ($("#collapsible-navbar").is(":hidden")) {
      $(".navbar-brand").css("margin-left", "0%");
      $(".navbar-collapse").css("margin-right", "0%");
    } else {
      $(".navbar-brand").css("margin-left", "16.66%");
      $(".navbar-collapse").css("margin-right", "16.66%");
    }
  }
  // Set navbar margins on load
  removeNavbarMargins();
  // Set navbar margins on window resize
  $(window).resize(function () {
    removeNavbarMargins();
  });

  // Change menu background color on menu icon click
  $('#menu-icon').click( function() {
    $('.navbar-expand-md').toggleClass("menu-active");
  });
});