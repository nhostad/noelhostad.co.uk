<?php
class Calendar_events_m extends MY_Model
{
	protected $db_table = 'calendar_events';
	protected $db_table_pk = 'event_id';
	
	public $event_id;
	public $event_name;
	public $date;
	public $time;
	public $all_day;
	public $location;
	public $duration;
	public $notes;

	public function __construct($id = null)
	{
		parent::__construct();
	}
	
	public function get_events_of_month( $year, $month, $user_id )
	{
		$this->db->reset_query();
		
		$this->db->select(array('*'));
		$this->db->from('calendar_events');
		$this->db->where("date LIKE '" . $year . '-' . $month . "%'");
		$this->db->order_by('time');
		$query = $this->db->get();
		
		return $query->result();
	}
	
	public function get_events_of_date_range( $start, $end, $user_id )
	{
		$this->db->reset_query();
		
		$this->db->select(array('*'));
		$this->db->from('calendar_events');
		$this->db->where("date >= '" . $start . "' AND date <= '" . $end . "'");
		$this->db->order_by('time');
		$query = $this->db->get();
		
		return $query->result();
	}
	
	public function get_binary_events_of_month( $year, $month, $user_id )
	{
		// - WORKS IN SIMILAR WAY TO ABOVE FUNCTION BUT INSTEAD OF THE EVENTS IT JUST BRINGS BACK WHETHER THAT DAY HAS ANY EVENTS
		$this->db->reset_query();
		
		$this->db->select(array('date'));
		$this->db->distinct();
		$this->db->from('calendar_events');
		$this->db->where("date LIKE '" . $year . '-' . $month . "%'");
		$this->db->order_by('time');
		$query = $this->db->get();
		
		return $query->result();
	}
}
?>