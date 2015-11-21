<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sector extends CI_Controller {
	
	public function index ( $sector_id )
	{
		// - HELPERS
		$this->load->helper('html');
		$this->load->helper('url');
		
		$sector = new stdclass();
		$sector->name = 'Pharmaceuticals';
		
		// - ALPHA
		$this->load->view('main/alpha.html', array(
			'title' => 'Juice E-learning - Sector - ' . $sector->name,
			'extra_css' => array(
				'css/sector/base.css',
				'css/sector/colours.css',
				'css/sector/text.css',
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
				array('view' => 'sector/header.html', 'vars' => array('sub_title' => $sector->name)),
			),
		));
		
		// - CONTAINER
		$this->load->view('main/container.html', array(
			'extra_views' => array(
				array('view' => 'sector/main_content.html', 'vars' => array()),
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
