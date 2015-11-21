<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Banner extends CI_Controller {
	
	// - UTILITY FUNCTIONS FOR BANNER, AJAX CALLS
	
	public function index()
	{
		// - HELPERS
		$this->load->helper('html');
		$this->load->helper('url');
		
		// - ALPHA
		$this->load->view('main/alpha.html', array(
			'title' => 'Professional E-learning Production',
			'extra_css' => array(
				'css/promo.css',
				'css/home/base.css',
				'css/home/colours.css',
				'css/home/text.css',
			),
			'extra_js' => array('js/banner.js'),
		));
		
		// - TOP BAR
		$this->load->view('main/top_bar.html', array(
			'extra_views' => array(
				array('view' => 'main/header.html', 'vars' => array()),
			),
		));
		
		// - CONTAINER
		$this->load->view('main/container.html', array(
			'extra_views' => array(
				array('view' => 'error/404.html', 'vars' => array()),
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
	
	// - AJAX CALLS
	
	public function ajax_get_slides()
	{
		// LOAD DATABASE MODULE
		$this->load->database();
		
		// CREATE BLANK ARRAY
		$output = array();
		
		// QUERY
		$query  = $this->db->get_where('banners', array('active' => '1'), 0, 1);
		
		// ADD EACH RESULTING ROW TO THE OUTPUT ARRAY
		foreach ($query->result() as $row)
		{
			$output[] = $row;
		}
		
		// ECHO THE OUTPUT
		echo json_encode ( $output );
	}
}