<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bespoke_e_learning extends CI_Controller {
	
	public function index()
	{
		// - HELPERS
		$this->load->helper('html');
		$this->load->helper('url');
		
		// - ALPHA
		$this->load->view('main/alpha.html', array(
			'title' => 'Bespoke E-learning',
			'extra_css' => array(
				'css/bespoke_e_learning/base.css',
				'css/bespoke_e_learning/colours.css',
				'css/bespoke_e_learning/text.css',
				'css/sidebar/base.css',
				'css/sidebar/colours.css',
				'css/sidebar/text.css',
			),
			'extra_js' => array(),
		));
		
		// - TOP BAR
		$this->load->view('main/top_bar.html', array(
			'extra_views' => array(
				array('view' => 'main/header.html', 'vars' => array()),
				array('view' => 'bespoke_e_learning/header.html', 'vars' => array()),
			),
		));
		
		// - CONTAINER
		$this->load->view('main/container.html', array(
			'extra_views' => array(
				array('view' => 'bespoke_e_learning/main_content.html', 'vars' => array()),
				array('view' => 'sidebar/main_content.html', 'vars' => array('colour_class' => 'blue')),
			),
		));
		
		// - FOOTER
		$this->load->view('main/bottom_bar.html', array(
			'extra_views' => array(
				array('view' => 'main/footer.html', 'vars' => array()),
			),
		));
		
		// - OMEGA
		$this->load->view('main/omega.html');
	}
	
}
