<?php
class Portfolio_m extends MY_Model {
	
	protected $db_table = 'portfolio';
	protected $db_table_pk = 'portfolio_item_id';
	
	public $portfolio_item_id;
	public $client_name;
	public $project_name;
	public $blurb;
	public $video_thumb_uri;
	public $video_uri;
	
	function __construct()
	{
		parent::__construct();
	}
	
}