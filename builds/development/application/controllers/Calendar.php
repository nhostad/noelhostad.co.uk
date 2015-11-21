<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Calendar extends CI_Controller
{
	public function index($year = null, $month = null)
	{
		if( is_null ( $year ) && is_null ( $month ) )
			$this->month_view( date('Y'), date('m') );
		else
			$this->month_view($year, $month);
	}
	
	public function month_view($year = null, $month = null)
	{
		// - HELPERS
		$this->load->helper(array(
			'html',
			'url',
			'calendar',
			'str',
			'math',
		));
		
		// - MODELS
		$this->load->model('Calendar_events_m');
				
		$calendar = new CalendarHelper();
		
		// - MONTH VIEW
		$month_dt = new DateTime ( "$year-$month-01", new DateTimeZone('Europe/London') );
		$month_view = $calendar->get_month_view($year, $month);
		
		$m_cal_events = new Calendar_events_m();
		$events = $m_cal_events->get_events_of_month( $year, $month, null );
		//echo '<pre>' . json_encode($month_view, JSON_PRETTY_PRINT) . '</pre>';
		$events = $m_cal_events->get_events_of_date_range( $month_view->start->format('Y-m-d'), $month_view->end->format('Y-m-d'), null );
		//echo json_encode($events);
		for($i = 0; $i < count ( $events ); $i++)
		{
			$events[$i]->event_name = Str::decode ( $events[$i]->event_name );
			$events[$i]->location = Str::decode ( $events[$i]->location );
			$events[$i]->notes = Str::decode ( $events[$i]->notes );
			$month_view->dates[$events[$i]->date]->events[] = $events[$i];
		}
		//echo json_encode($month_view);
		
		// - YEAR ROW
		$year_row = array();
		
		for($i = 1; $i <= 12; $i++)
		{
			$month_num = MathNH::alz( $i, 2 );
			
			$year_row[$month_num] = $calendar->get_month_view($year, $month_num);
			$events = $m_cal_events->get_binary_events_of_month( $year, $month_num, null );
			for($j = 0; $j < count ( $events ); $j++)
				$year_row[$month_num]->dates[$events[$j]->date]->has_events = TRUE;
		}
		
		$next_month = new DateTime( $month_dt->format('Y-m-d'), new DateTimeZone( 'Europe/London' ) );
		$next_month->modify( '+1 month' );
		$prev_month = new DateTime( $month_dt->format('Y-m-d'), new DateTimeZone( 'Europe/London' ) );
		$prev_month->modify( '-1 month' );
		
		$next_year = new DateTime( $month_dt->format('Y-m-d'), new DateTimeZone( 'Europe/London' ) );
		$next_year->modify( '+1 year' );
		$prev_year = new DateTime( $month_dt->format('Y-m-d'), new DateTimeZone( 'Europe/London' ) );
		$prev_year->modify( '-1 year' );
		
		// - Views
		$this->load->view('main/alpha.html', array(
			'title'	=>	"Calendar - Month View - " . $month_dt->format('F Y'),
			'extra_css'	=> array(),
			'extra_js'	=> array(
				'js/greensock/TweenMax.min.js',
				'js/form.js',
			)
		));
		
		//$this->view->load('header.html');
		//$this->view->load('content_opener.html', ['subheader' => "Calendar - Month View - " . $month_dt->format('F Y')]);
		
		$this->load->view('calendar/month_view.html', array(
			'year' => $year,
			'month' => $month,
			'month_view' => $month_view->dates,
			'events' => $events,
			'month_dt' => $month_dt,
			'next' => $next_month,
			'prev' => $prev_month,
		));
		
		$this->load->view('calendar/year_row.html', array(
			'year' => $year,
			'month' => $month,
			'year_row' => $year_row,
			'next' => $next_year,
			'prev' => $prev_year,
		));
		/*
		$this->view->load('content_closer.html');
		$this->view->load('footer.html');
		
		$this->view->load('omega.html');*/
	}
}