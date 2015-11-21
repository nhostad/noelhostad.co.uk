<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Portfolio extends CI_Controller {
	
	public function index()
	{
		// - HELPERS
		$this->load->helper('html');
		$this->load->helper('url');
		
		// - MODELS
		$this->load->model('Portfolio_m');
		
		// - DATA
		$portfolio_items = $this->Portfolio_m->get();
		
		// - ALPHA
		$this->load->view('main/alpha.html', array(
			'title' => 'Juice E-learning - Portfolio',
			'extra_css' => array(
				'css/portfolio/base.css',
				'css/portfolio/colours.css',
				'css/portfolio/text.css',
				'css/sidebar/base.css',
				'css/sidebar/colours.css',
				'css/sidebar/text.css',
				'css/video_player/base.css',
				'css/video_player/colours.css',
				'css/video_player/text.css',
			),
			'extra_js' => array(
				'js/greensock/TweenMax.min.js',
				'js/utils/str.js',
				'js/video_player/main.js',
			),
		));
		
		// - TOP BAR
		$this->load->view('main/top_bar.html', array(
			'extra_views' => array(
				array('view' => 'main/header.html', 'vars' => array()),
				array('view' => 'portfolio/header.html', 'vars' => array()),
			),
		));
		
		// - CONTAINER
		$this->load->view('main/container.html', array(
			'extra_views' => array(
				array('view' => 'video_player/player.html', 'vars' => array()),
				array('view' => 'portfolio/main_content.html', 'vars' => array('portfolio_items' => $portfolio_items)),
				array('view' => 'sidebar/main_content.html', 'vars' => array('colour_class' => 'green')),
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
	
	public function ajax_get_elearning_portfolio_items()
	{	
		// - MODELS
		$this->load->model('Portfolio_m');
		
		// - DATA
		$portfolio_items = $this->Portfolio_m->get();
		
		$output = array();
		
		foreach ( $portfolio_items as $portfolio_item )
		{
			$output[] = $portfolio_item;
		}
		
		echo json_encode ( $output );
	}
	
	public function ajax_get_web_dev_portfolio_items()
	{	
		// - MODELS
		$this->load->model('Portfolio_m');
		
		// - DATA
		$portfolio_items = $this->Portfolio_m->get();
		
		$output = array();
		
		foreach ( $portfolio_items as $portfolio_item )
		{
			$output[] = $portfolio_item;
		}
		
		echo json_encode ( $output );
	}
	
	public function ajax_get_video_data()
	{
		// - MODELS
		$this->load->model('Portfolio_m');
		
		// - DATA
		$portfolio_data = new Portfolio_m();
		$portfolio_data->load($_POST['id']);
		
		echo json_encode ( $portfolio_data );
	}
	
}
