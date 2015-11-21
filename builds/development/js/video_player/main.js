// JavaScript Document

var video;

$(document).ready(function(e) {
	video = document.getElementById('video_tag');
});

function enable_videos()
{
	$('.portfolio_video_img').on('click', function(evt) {
		var form_data = new FormData();

		form_data.append('id', $(this).parentsUntil('.portfolio_item').parent().attr('data-id'));

		$.ajax({
			url:'portfolio/ajax_get_video_data',
			data:form_data,
			type:'post',
			dataType:'text',
			processData:false,
			contentType:false,
			success:function(data)
			{
				//console.log(data);
				data = JSON.parse(data);
				
				$('#video_player #video_title #client_name').html ( str_util.decode ( data.client_name ) );
				$('#video_player #video_title #project_name').html ( str_util.decode ( data.project_name ) );
				$('#video_player video source[type="video/mp4"]').attr ( 'src', data.video_mp4_uri );
				$('#video_player video source[type="video/ogg"]').attr ( 'src', data.video_ogg_uri );
				
				video.load();
				video.play();
				
				$('#blackout').show();
				$('#video_player').show();
			}
		});
	});
	
	// CLOSE BUTTON FUNCTIONALITY
	$('#video_close_btn').on('click', function(evt) {
		video.pause();
		
		$('#blackout').hide();
		$('#video_player').hide();
	});
}