<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Web_dev extends CI_Controller {

	public function index()
	{
		// - HELPERS
		$this->load->helper('html');
		$this->load->helper('url');

		// - ALPHA
		$this->load->view('main/alpha.html', array(
			'title' => 'NOELHOSTAD.CO.UK - E-LEARNING &AMP; WEB DEVELOPER - WEB PORTFOLIO',
			'extra_css' => array(
				'css/style.css',
			),
			'extra_js' => array(
				array('absolute' => TRUE, 'address' => 'http://use.edgefonts.net/bebas-neue.js'),
				array('absolute' => TRUE, 'address' => 'http://use.edgefonts.net/neuton.js'),
			),
		));

		$this->load->view('main/header.html');

		// - CONTENT
		$this->load->view('web_dev/main.html', array());
		$this->load->view('contact/main.html', array());

		// - FOOTER
		$this->load->view('main/footer.html', array());

		$this->load->view('main/footer_scripts.html', array(
			'scripts' => array(
				'<script src="/js/script.js"></script>',
				'<script src="/js/foundation.min.js"></script>',
				'<script>$(document).foundation();</script>',
				'<script src="/js/main.js"></script>',
			),
		));

		// - OMEGA
		$this->load->view('main/omega.html');
	}
}
