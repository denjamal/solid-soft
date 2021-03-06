jQuery(function ($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function () {
		preloader.remove();
	});

	//#main-slider
	var slideHeight = $(window).height() + 17;
	
	$('#vegas').css('height', slideHeight);

	$(window).resize(function () {
		var slideHeight = $(window).height();
		'use strict',
		$('#vegas').css('height', slideHeight);
	});

	//Scroll Menu
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > slideHeight) {
			$('.main-nav').addClass('navbar-fixed-top');
		} else {
			$('.main-nav').removeClass('navbar-fixed-top');
		}
	});

	// Navigation Scroll
	$(window).scroll(function (event) {
		Scroll();
	});

	$('.navbar-collapse ul li a, #portfolio a[href=#contact], #explore').on('click', function () {
		$('html, body').animate({ scrollTop: $(this.hash).offset().top - 5 }, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop = [];
		var contentBottom = [];
		var winTop = $(window).scrollTop();
		var rangeTop = 200;
		var rangeBottom = 500;
		$('.navbar-collapse').find('.scroll a').each(function () {
			contentTop.push($($(this).attr('href')).offset().top);
			contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
		})
		$.each(contentTop, function (i) {
			if (winTop > contentTop[i] - rangeTop) {
				$('.navbar-collapse li.scroll')
					.removeClass('active')
					.eq(i).addClass('active');
			}
		})
	};

	$('#tohash').on('click', function () {
		$('html, body').animate({ scrollTop: $(this.hash).offset().top - 5 }, 1000);
		return false;
	});

	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();

	// Progress Bar
	$('#about-us').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'), function () {
				$(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
			});
			$(this).unbind('inview');
		}
	});

	//Countdown
	$('#features').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	// Portfolio Single View
	$('#portfolio').on('click', '.folio-read-more', function (event) {
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#portfolio-single-wrap',
			parts = full_url.split("#"),
			trgt = parts[1],
			target_top = $("#" + trgt).offset().top;

		$('html, body').animate({ scrollTop: target_top }, 600);
		$('#portfolio-single').slideUp(500, function () {
			$(this).load(link, function () {
				$(this).slideDown(500);
			});
		});
	});

	// Close Portfolio Single View
	$('#portfolio-single-wrap').on('click', '.close-folio-item', function (event) {
		event.preventDefault();
		var full_url = '#portfolio',
			parts = full_url.split("#"),
			trgt = parts[1],
			target_offset = $("#" + trgt).offset(),
			target_top = target_offset.top;
		$('html, body').animate({ scrollTop: target_top }, 600);
		$("#portfolio-single").slideUp(500);
	});

	//Google Map
	var latitude = $('#google-map').data('latitude')
	var longitude = $('#google-map').data('longitude')
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var contentString = '';
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);


	$('#vegas').vegas({
		overlay: true,
		transition: 'fade',
		transitionDuration: 4000,
		delay: 10000,
		color: 'red',
		animation: 'random',
		animationDuration: 20000,
		cover: true,
		slides: [
			{ src: '../images/Slider/1.jpeg' },
			{ src: '../images/Slider/2.jpeg' },
			{ src: '../images/Slider/3.jpeg' },
		]
	});

});

