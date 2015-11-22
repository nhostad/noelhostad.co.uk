var scrollYPos = {
	contact : {}
};

$(document).ready(function(evt) {

	// - ALTER LINKS IF JS PRESENT SO IT TWEENS THE SCROLLING

	$('a[href="#top"]').on ( 'click', function(evt) {
		TweenMax.to ( $('body'), 1, {'scrollTop' : 0, ease : Back.easeInOut} );
	});
	$('a#top').remove();
	$('a[href="#top"]').removeAttr('href');

	$('a[href="#contact"]').on ( 'click', function(evt) {
		scrollYPos.contact.y = $('.contact-form').offset().top;
		TweenMax.to ( $('body'), 1, {'scrollTop' : scrollYPos.contact.y, ease : Circ.easeInOut} );
	});
	$('a#contact').remove();
	$('a[href="#contact"]').removeAttr('href');

	$('#portfolio-mask').owlCarousel({
		itemsDesktop : [1000,5], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,3], // betweem 900px and 601px
		itemsTablet: [600,2], //2 items between 600 and 0
		itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
		singleItem : true
	});

	$(window).scroll(function() {
		if ( $(window).scrollTop() > 500 )
		{
			$('.back-to-top a').css ( 'opacity', 1 );
			$('.mini-links').css ( 'opacity', 1 );
		}
		else
		{
			$('.back-to-top a').css ( 'opacity', 0 );
			$('.mini-links').css ( 'opacity', 0 );
		}
	});

	$(window).trigger('scroll');

});
