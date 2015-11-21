var positions = {
	'work_examples_elearning' : {
		'work_examples_web_dev' : {'left':'463px', 'top':'-120px', 'height':'110px'},
		'make_contact' : {'left':'465px', 'top':'360px', 'height':'90px'},
		'about_myself' : {'left':'645px', 'top':'360px', 'height':'90px'},
	},

	'work_examples_web_dev' : {
		'work_examples_elearning' : {'left':'105px', 'top':'360px', 'height':'90px'},
		'make_contact' : {'left':'465px', 'top':'360px', 'height':'90px'},
		'about_myself' : {'left':'645px', 'top':'360px', 'height':'90px'},
	},

	'make_contact' : {
		'work_examples_elearning' : {'left':'285px', 'top':'360px', 'height':'90px'},
		'about_myself' : {'left':'645px', 'top':'360px', 'height':'90px'},
		'work_examples_web_dev' : {'left':'463px', 'top':'-120px', 'height':'110px'},
	},

	'about_myself' : {
		'work_examples_elearning' : {'left':'105px', 'top':'360px', 'height':'90px'},
		'work_examples_web_dev'   : {'left':'463px', 'top':'-120px', 'height':'110px'},
		'make_contact' : {'left':'465px', 'top':'360px', 'height':'90px'},
	},
};

var work_examples = {
	elearning : {
		curr_pos : 0,
		examples : [],
		enable_next : function()
		{
			$('#work_examples_elearning_scroller #work_examples_next_btn').off('click');
			$('#work_examples_elearning_scroller #work_examples_next_btn').on('click', function(evt) {
				if ( work_examples.elearning.curr_pos < work_examples.elearning.examples.length - 1 )
					work_examples.elearning.curr_pos++;
					
				work_examples.elearning.update_scroll_position();
			});

			$('#work_examples_elearning_scroller #work_examples_prev_btn').off('click');
			$('#work_examples_elearning_scroller #work_examples_prev_btn').on('click', function(evt) {
				if ( work_examples.elearning.curr_pos > 0 )
					work_examples.elearning.curr_pos--;

				work_examples.elearning.update_scroll_position();
			});
		},

		update_scroll_position : function()
		{
			TweenMax.to ( $('#work_examples_elearning_scroller #portfolio_items'), 0.35, {top:( work_examples.elearning.curr_pos * -320 + 40 ) + 'px', onComplete:work_examples.elearning.update_prev_next} );
		},

		update_prev_next : function()
		{console.log('upn');
			if ( work_examples.elearning.examples.length <= 1)
			{
				$('#work_examples_elearning_scroller #work_examples_prev_btn').addClass('disabled');
				$('#work_examples_elearning_scroller #work_examples_next_btn').addClass('disabled');
			}
			else
			{
				if (  work_examples.elearning.curr_pos === 0 )
				{
					$('#work_examples_elearning_scroller #work_examples_prev_btn').addClass('disabled');
					$('#work_examples_elearning_scroller #work_examples_next_btn').addClass('enabled');
					$('#work_examples_elearning_scroller #work_examples_prev_btn').removeClass('enabled');
					$('#work_examples_elearning_scroller #work_examples_next_btn').removeClass('disabled');
				}
				else if ( work_examples.elearning.curr_pos === work_examples.elearning.examples.length - 1 )
				{
					$('#work_examples_elearning_scroller #work_examples_prev_btn').addClass('enabled');
					$('#work_examples_elearning_scroller #work_examples_next_btn').addClass('disabled');
					$('#work_examples_elearning_scroller #work_examples_prev_btn').removeClass('disabled');
					$('#work_examples_elearning_scroller #work_examples_next_btn').removeClass('enabled');
				}
				else
				{
					$('#work_examples_elearning_scroller #work_examples_prev_btn').addClass('enabled');
					$('#work_examples_elearning_scroller #work_examples_next_btn').addClass('enabled');
					$('#work_examples_elearning_scroller #work_examples_prev_btn').removeClass('disabled');
					$('#work_examples_elearning_scroller #work_examples_next_btn').removeClass('disabled');
				}
			}
		},
	},
	web_dev : {
		curr_pos : 0,
		examples : [],
		enable_next : function()
		{
			$('#work_examples_web_dev_scroller #work_examples_next_btn').off('click');
			$('#work_examples_web_dev_scroller #work_examples_next_btn').on('click', function(evt) {
				if ( work_examples.web_dev.curr_pos < work_examples.web_dev.examples.length - 1 )
					work_examples.web_dev.curr_pos++;

				work_examples.update_scroll_position();
			});

			$('#work_examples_web_dev_scroller #work_examples_prev_btn').off('click');
			$('#work_examples_web_dev_scroller #work_examples_prev_btn').on('click', function(evt) {
				if ( work_examples.web_dev.curr_pos > 0 )
					work_examples.web_dev.curr_pos--;

				work_examples.web_dev.update_scroll_position();
			});
		},

		update_scroll_position : function()
		{
			TweenMax.to ( $('#work_examples_web_dev_scroller #portfolio_items'), 0.35, {top:( work_examples.web_dev.curr_pos * -320 + 40 ) + 'px', onComplete:work_examples.web_dev.update_prev_next} );
		},

		update_prev_next : function()
		{
			if ( work_examples.web_dev.examples.length <= 1)
			{
				$('#work_examples_web_dev_scroller #work_examples_prev_btn').addClass('disabled');
				$('#work_examples_web_dev_scroller #work_examples_next_btn').addClass('disabled');
			}
			else
			{
				if (  work_examples.web_dev.curr_pos === 0 )
				{
					$('#work_examples_web_dev_scroller #work_examples_prev_btn').addClass('disabled');
					$('#work_examples_web_dev_scroller #work_examples_next_btn').addClass('enabled');
					$('#work_examples_web_dev_scroller #work_examples_prev_btn').removeClass('enabled');
					$('#work_examples_web_dev_scroller #work_examples_next_btn').removeClass('disabled');
				}
				else if ( work_examples.web_dev.curr_pos === work_examples.web_dev.examples.length - 1 )
				{
					$('#work_examples_web_dev_scroller #work_examples_prev_btn').addClass('enabled');
					$('#work_examples_web_dev_scroller #work_examples_next_btn').addClass('disabled');
					$('#work_examples_web_dev_scroller #work_examples_prev_btn').removeClass('disabled');
					$('#work_examples_web_dev_scroller #work_examples_next_btn').removeClass('enabled');
				}
				else
				{
					$('#work_examples_web_dev_scroller #work_examples_prev_btn').addClass('enabled');
					$('#work_examples_web_dev_scroller #work_examples_next_btn').addClass('enabled');
					$('#work_examples_web_dev_scroller #work_examples_prev_btn').removeClass('disabled');
					$('#work_examples_web_dev_scroller #work_examples_next_btn').removeClass('disabled');
				}
			}
		},
	}
	
	
};

$(document).ready(function(evt)
{
	// - WORK EXAMPLES BUTTON
	$('#work_examples_elearning').on('click', function(evt) {
		
		$('.nav_btn').css('z-index', 1);
		$(this).css('z-index', 10);
		
		TweenMax.to ( $(this).find('.first_line'), 0.5, {
			top:'-80px',
			/*delay:0.2,*/
		} );
		
		TweenMax.to ( $(this).find('.second_line'), 0.5, {
			top:'-55px',
			/*delay:0.3,*/
		} );
		
		TweenMax.to ( $(this), 0.5, {
			left:0,
			top:0,
			width:'890px',
			height:'350px',
			'background-color':'#FF9933',
			/*delay:0.5,*/
		} );
		
		tween_to_positions ( 'work_examples_elearning' );
		
		/*TweenMax.to ( $(this).find('.rollover'), 0.5, {
			width:0,
			delay:1,
		});*/
		
		TweenMax.delayedCall ( 1, function() {
			$.ajax({
				url:'/portfolio/ajax_get_elearning_portfolio_items',
				dataType:'text',
				success:function(data)
				{
					var html = '<div id="portfolio_items">';

					data = JSON.parse(data);

					for ( var i = 0; i < data.length; i++ )
					{
						html +=	'<div class="portfolio_item" data-id="' + data[i].portfolio_item_id + '">' +
							'<div class="portfolio_thumb">' +
								'<h3 class="portfolio_item_title">' +
									'<span class="client_name">' + str_util.decode ( data[i].client_name ) + '</span><span class="project_title">' + str_util.decode ( data[i].project_name ) + '</span>' +
								'</h3>' +

								'<div class="portfolio_video_img"' +
									'style="background-image:url(' + str_util.decode ( data[i].video_thumb_uri ) + ');"' +
									'title="' + str_util.decode ( data[i].video_thumb_alt_text ) + '">' +
									'<div class="portfolio_video_img_overlay"></div>' +
									'<div class="portfolio_play_pause_btn">&#9656;</div>' +
								'</div>' +

								'<div class="portfolio_text_content">' + str_util.decode ( data[i].blurb ) + '</div>' +
							'</div>' +
							'<div class="clear"></div>' +
						'</div>';
					}

					html += '</div>';

					work_examples.elearning.examples = data;

					$('#work_examples_elearning_recepticle').show();
					$('#work_examples_elearning_recepticle').html(html);

					enable_videos();

					$('#work_examples_elearning_scroller #work_examples_prev_btn').show();
					$('#work_examples_elearning_scroller #work_examples_next_btn').show();

					TweenMax.to ( $('#work_examples_elearning_scroller #work_examples_prev_btn'), 0.35, {top:'-44px'} );
					TweenMax.to ( $('#work_examples_elearning_scroller #work_examples_next_btn'), 0.35, {top:'350px'} );
					
					work_examples.elearning.enable_next();
					
					TweenMax.to ( $('#work_examples_elearning_scroller #portfolio_items'), 0.5, {autoAlpha:1} );
				}
			});
		});
	});
	
	
	
	$('#make_contact').on('click', function(evt) {
		$('.nav_btn').css('z-index', 1);
		$(this).css('z-index', 10);
		
		tween_to_positions('make_contact');
		
		TweenMax.to ( $(this).find('.first_line'), 0.5, {
			top:'-86px',
			delay:0.2,
		} );
		
		TweenMax.to ( $(this).find('.second_line'), 0.5, {
			top:'-40px',
			delay:0.3,
		} );
		
		TweenMax.to ( $(this), 0.5, {
			left:0,
			top:0,
			width:'890px',
			height:'350px',
			'background-color':'#00CCFF',
			delay:0.5,
		} );
		
		TweenMax.to ( $(this).find('.rollover'), 0.5, {
			width:0,
			delay:1,
			onComplete:function() {
				$('#make_contact_content').show();
				TweenMax.to ( $('#make_contact_content'), 0.5, {autoAlpha:1, delay:0.5} );
				
				$('#make_contact_content #send_message').off('click');
				$('#make_contact_content #send_message').on('click', function(evt) {
					var form_data = new FormData();
					
					form_data.append ( 'Name', $('#make_contact_content #name').val() );
					form_data.append ( 'Email', $('#make_contact_content #email').val() );
					form_data.append ( 'Phone', $('#make_contact_content #phone').val() );
					form_data.append ( 'Message', $('#make_contact_content #message').val() );
					
					$.ajax({
						url:'/contact/ajax_submit_form',
						data:form_data,
						type:'post',
						processData:false,
						contentType:false,
						dataType:'text',
						success:function(data)
						{
							console.log(data);
						}
					});
				});
			},
		});
	});
	
	
	
	$('#about_myself').on('click', function(evt) {
		$('.nav_btn').css('z-index', 1);
		$(this).css('z-index', 10);
		
		tween_to_positions('about_myself');
		
		TweenMax.to ( $(this).find('.first_line'), 0.5, {
			top:'-86px',
			delay:0.2,
		} );
		
		TweenMax.to ( $(this).find('.second_line'), 0.5, {
			top:'-40px',
			delay:0.3,
		} );
		
		TweenMax.to ( $(this), 0.5, {
			left:0,
			top:0,
			width:'890px',
			height:'350px',
			'background-color':'#FF6699',
			delay:0.5,
		} );
		
		TweenMax.to ( $(this).find('.rollover'), 0.5, {
			width:0,
			delay:1,
			onComplete:function() {
				$('#about_myself_content').show();
				TweenMax.to ( $('#about_myself_content'), 0.5, {autoAlpha:1, delay:0.5} );
			},
		});
	});
	
	// PHP EXAMPLES
	// BV Associates
	// JemBuild
	// MyPinnacle
	// RPM Polymers
	// Just Add Birds
	// Johnston & Jeff
	
	$('#work_examples_web_dev').on('click', function(evt) {
		
		$('.nav_btn').css('z-index', 1);
		$(this).css('z-index', 10);
		
		TweenMax.to ( $(this).find('.first_line'), 0.5, {
			top:'-80px',
			/*delay:0.2,*/
		} );
		
		TweenMax.to ( $(this).find('.second_line'), 0.5, {
			top:'-55px',
			/*delay:0.3,*/
		} );
		
		TweenMax.to ( $(this), 0.5, {
			left:0,
			top:0,
			width:'890px',
			height:'350px',
			'background-color':'#99FF33',
			/*delay:0.5,*/
		} );
		
		tween_to_positions ( 'work_examples_web_dev' );
		
		/*TweenMax.to ( $(this).find('.rollover'), 0.5, {
			width:0,
			delay:1,
		});*/
		
		TweenMax.delayedCall ( 1, function() {
			$.ajax({
				url:'/portfolio/ajax_get_web_dev_portfolio_items',
				dataType:'text',
				success:function(data)
				{
					var html = '<div id="portfolio_items">';

					data = JSON.parse(data);

					for ( var i = 0; i < data.length; i++ )
					{
						html +=	'<div class="portfolio_item" data-id="' + data[i].portfolio_item_id + '">' +
							'<div class="portfolio_thumb">' +
								'<h3 class="portfolio_item_title">' +
									'<span class="client_name">' + str_util.decode ( data[i].client_name ) + '</span><span class="project_title">' + str_util.decode ( data[i].project_name ) + '</span>' +
								'</h3>' +

								'<div class="portfolio_video_img"' +
									'style="background-image:url(' + str_util.decode ( data[i].video_thumb_uri ) + ');"' +
									'title="' + str_util.decode ( data[i].video_thumb_alt_text ) + '">' +
									'<div class="portfolio_video_img_overlay"></div>' +
									'<div class="portfolio_play_pause_btn">&#9656;</div>' +
								'</div>' +

								'<div class="portfolio_text_content">' + str_util.decode ( data[i].blurb ) + '</div>' +
							'</div>' +
							'<div class="clear"></div>' +
						'</div>';
					}

					html += '</div>';

					work_examples.web_dev.examples = data;

					$('#work_examples_web_dev_recepticle').show();
					$('#work_examples_web_dev_recepticle').html(html);

					enable_videos();

					$('#work_examples_web_dev_scroller #work_examples_prev_btn').show();
					$('#work_examples_web_dev_scroller #work_examples_next_btn').show();

					TweenMax.to ( $('#work_examples_web_dev_scroller #work_examples_prev_btn'), 0.35, {top:'-44px'} );
					TweenMax.to ( $('#work_examples_web_dev_scroller #work_examples_next_btn'), 0.35, {top:'350px'} );
					
					work_examples.web_dev.enable_next();
					
					TweenMax.to ( $('#work_examples_web_dev_scroller #portfolio_items'), 0.5, {autoAlpha:1} );
				}
			});
		});
	});
	
});

function tween_to_positions ( key )
{
	if ( key !== 'work_examples_elearning' )
	{
		TweenMax.to ( $('#work_examples_elearning'), 0.35, {
			left:positions[key].work_examples_elearning.left,
			top:positions[key].work_examples_elearning.top,
			height:positions[key].work_examples_elearning.height,
			delay:1,
		});
		work_examples_elearning_out();
	}
	
	if ( key !== 'make_contact' )
	{
		TweenMax.to ( $('#make_contact'), 0.35, {
			left:positions[key].make_contact.left,
			top:positions[key].make_contact.top,
			height:positions[key].make_contact.height,
			delay:1,
		});
		make_contact_out();
	}
	
	if ( key !== 'about_myself' )
	{
		TweenMax.to ( $('#about_myself'), 0.35, {
			left:positions[key].about_myself.left,
			top:positions[key].about_myself.top,
			height:positions[key].about_myself.height,
			delay:1,
		});
		about_myself_out();
	}
	
	if ( key !== 'work_examples_web_dev' )
	{
		TweenMax.to ( $('#work_examples_web_dev'), 0.35, {
			left:positions[key].work_examples_web_dev.left,
			top:positions[key].work_examples_web_dev.top,
			height:positions[key].work_examples_web_dev.height,
			delay:1,
		});
		work_examples_web_dev_out();
	}
}

function work_examples_elearning_out()
{
	TweenMax.to ( $('#work_examples_elearning_scroller #portfolio_items'), 0.5, {autoAlpha:0} );
	
	TweenMax.to ( $('#work_examples_elearning'), 0.5, {'background-color':'#DDDDDD', width:'350px', height:'90px', delay:1} );
	TweenMax.to ( $('#work_examples_elearning .first_line'), 0.5, {top:'10px'} );
	TweenMax.to ( $('#work_examples_elearning .second_line'), 0.5, {top:'35px'} );
	
	TweenMax.to ( $('#work_examples_elearning .rollover'), 0.5, {height:'100%'} );
	
	TweenMax.to ( $('#work_examples_elearning_scroller #work_examples_prev_btn'), 0.35, {top:0} );
	TweenMax.to ( $('#work_examples_elearning_scroller #work_examples_next_btn'), 0.35, {top:'306px'} );
}

function make_contact_out()
{
	TweenMax.to ( $('#make_contact_content'), 0.5, {autoAlpha:0} );
	
	TweenMax.to ( $('#make_contact'), 0.5, {'background-color':'#DDDDDD', width:'170px', height:'90px', delay:0.3} );
	TweenMax.to ( $('#make_contact .first_line'), 0.5, {top:'0', delay:0.3} );
	TweenMax.to ( $('#make_contact .second_line'), 0.5, {top:'45px', delay:0.3} );
	
	TweenMax.to ( $('#make_contact .rollover'), 0.5, {width:'100%'} );
}

function about_myself_out()
{
	TweenMax.to ( $('#about_myself_content'), 0.5, {autoAlpha:0} );
	
	TweenMax.to ( $('#about_myself'), 0.5, {'background-color':'#DDDDDD', width:'170px', height:'90px'} );
	TweenMax.to ( $('#about_myself .first_line'), 0.5, {top:'0'} );
	TweenMax.to ( $('#about_myself .second_line'), 0.5, {top:'45px'} );
	
	TweenMax.to ( $('#about_myself .rollover'), 0.5, {width:'100%'} );
}

function work_examples_web_dev_out()
{
	TweenMax.to ( $('#work_examples_web_dev'), 0.5, {'background-color':'#DDDDDD', height:'110px'} );
	TweenMax.to ( $('#work_examples_web_dev .first_line'), 0.5, {top:'31px'} );
	TweenMax.to ( $('#work_examples_web_dev .second_line'), 0.5, {top:'54px'} );
	
	TweenMax.to ( $('#work_examples_web_dev .rollover'), 0.5, {height:'100%'} );
}