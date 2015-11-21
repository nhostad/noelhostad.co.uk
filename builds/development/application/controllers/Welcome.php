<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index()
	{
		// - HELPERS
		$this->load->helper('html');
		$this->load->helper('url');

		// - ALPHA
		$this->load->view('main/alpha.html', array(
			'title' => 'NOELHOSTAD.CO.UK - E-LEARNING &AMP; WEB DEVELOPER',
			'extra_css' => array(
				'css/style.css',
			),
			'extra_js' => array(
				'js/greensock/TweenMax.min.js',
				'js/utils/str.js',
				'js/home.js',
				'js/video_player/main.js',
			),
		));

		// - CONTAINER
		$this->load->view('main/container.html', array(
			'extra_views' => array(
				array('view' => 'video_player/player.html', 'vars' => array()),
				array('view' => 'home/home.html', 'vars' => array()),
			),
		));

		// - FOOTER
		//$this->load->view('main/footer.html', array());

		// - OMEGA
		$this->load->view('main/omega.html');
	}
}
