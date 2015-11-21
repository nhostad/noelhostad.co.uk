<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CalendarHelper
{
	public $month_view;

	public function __construct()
	{
		
	}
	
	public function get_month_view($year = null, $month = null)
	{
		$week_starts = 'Mon';
		
		if( is_null ( $month ) && is_null ( $year ) )
		{
			$month	= date('m');
			$year	= date('Y');
		}
		
		$this_month = new DateTime( $year . '-' . $month . '-01', new DateTimeZone('Europe/London') );
		
		$last_month = new DateTime( $year . '-' . $month . '-01', new DateTimeZone('Europe/London') );
		$last_month->modify('-1 month');
		
		$next_month = new DateTime( $year . '-' . $month . '-01', new DateTimeZone('Europe/London') );
		$next_month->modify('+1 month');
		
		$month_arr = array();
		
		if( $week_starts === 'Mon' )
		{
			$debug  = 'inputs: ' . $month . ' ' . $year . "<br><br>";
			
			$debug .= $last_month->format( 'd-m-Y' ) . "<br>";
			$debug .= 'Days in Month: ' . $last_month->format( 't' ) . "<br>";
			$debug .= 'First day of Month: ' . $last_month->format( 'w' ) . "<br><br>";
			
			$debug .= $this_month->format( 'd-m-Y' ) . "<br>";
			$debug .= 'Days in Month: ' . $this_month->format( 't' ) . "<br>";
			$debug .= 'First day of Month: ' . $this_month->format( 'w' ) . "<br><br>";
			
			$debug .= $next_month->format( 'd-m-Y' ) . "<br>";
			$debug .= 'Days in Month: ' . $next_month->format( 't' ) . "<br>";
			$debug .= 'First day of Month: ' . $next_month->format( 'w' ) . "<br>";
			
			if( $this_month->format('w') === '1' )
			{
				// - 1ST OF MONTH IS A MONDAY
				$start = $this_month;
			}
			else
			{
				// - GET LAST MONDAY OF LAST MONTH
				$start = $this->get_last_dow_of_month( 1, $last_month );
			}
			
			$debug .= 'Last Mon of last month: ' . $start->format( 'd-m-Y' ) . '<br><br>';
			
			$last_day_of_this_month = $this_month->format( 'Y-m-t' );
			$last_day_of_this_month_dt = new DateTime( $last_day_of_this_month, new DateTimeZone('Europe/London') );
			
			$debug .= 'Last day of this month: ' . $last_day_of_this_month_dt->format( 'd-m-Y' );
			
			if( $last_day_of_this_month_dt->format( 'w' ) === '0' )
			{
				$debug .= ' is a Sunday<br><br>';
				$end = new DateTime( $this_month->format( 'Y-m-t' ), new DateTimeZone( 'Europe/London' ) );
			}
			else
			{
				$debug .= ' is not a Sunday<br><br>';
				$end = $this->get_first_dow_of_month( 0, $next_month );
				
				$debug .= ' First Sun of next month is: ' . $end->format( 'd-m-Y' ) . '<br><br>';
			}
			
			// - WHILE LOOP USES !== TO STOP SO ADD ONE DAY TO $END
			$end->modify( '+1 day' );
			
			// - START LOOP TO CREATE OBJECT
			$curr_day_dt = new DateTime( $start->format( 'Y-m-d' ), new DateTimeZone( 'Europe/London' ) );
			
			$i = 0;
			while( $curr_day_dt->format( 'Y-m-d' ) !== $end->format( 'Y-m-d' ) )
			{
				if( $i++ > 50)
					break;
				
				$tmp = new stdClass();
				$tmp->day = $curr_day_dt->format( 'D' );
				$tmp->num_day = $curr_day_dt->format( 'w' );
				$tmp->date = $curr_day_dt->format( 'Y-m-d' );
				$tmp->in_this_month = ( $curr_day_dt->format( 'm' ) === $this_month->format( 'm' ) );
				$tmp->events = array();
				
				$month_arr[$curr_day_dt->format( 'Y-m-d' )] = $tmp;
				$curr_day_dt->modify( '+1 day' );
			}
			
			$debug .= '<tt><pre>' . var_export( $month_arr, TRUE ) . '</pre></tt>';
		}
		
		$this->month_view = new stdClass();
		$this->month_view->dates = $month_arr;
		$this->month_view->start = $start;
		$this->month_view->end = $end;
		
		return $this->month_view;
		
		//echo $debug;
	}
	
	public function get_last_dow_of_month( $dow, $month_dt )
	{
		// - GET THE DATE OF THE LAST SAY MONDAY OR TUESDAY OF A GIVEN MONTH
		// - DOW 0:SUN, 1:MON, 2:TUE, 3:WED, 4:THU, 5:FRI, 6:SAT
		// - MONTH_DT:DATETIME VARIABLE TYPE
		
		$last_day = $month_dt->format( 'Y-m-t' );
		$last_day_dt = new DateTime( $last_day, new DateTimeZone( 'Europe/London' ) );
		
		if($last_day_dt->format( 'w' ) === $dow)
		{
			return $last_day_dt;
		}
		else
		{
			while( (int) $last_day_dt->format( 'w' ) !== $dow )
			{
				$last_day_dt->modify('-1 Day');
			}
			
			return $last_day_dt;
		}
	}
	
	public function get_first_dow_of_month( $dow, $month_dt )
	{
		// - GET THE DATE OF THE FIRST SAY MONDAY OR TUESDAY OF A GIVEN MONTH
		// - DOW 0:SUN, 1:MON, 2:TUE, 3:WED, 4:THU, 5:FRI, 6:SAT
		// - MONTH_DT:DATETIME VARIABLE TYPE
		
		$first_day = $month_dt->format( 'Y-m-' ) . '01';
		$first_day_dt = new DateTime( $first_day, new DateTimeZone( 'Europe/London' ) );
		
		if($first_day_dt->format( 'w' ) === $dow)
		{
			return $first_day_dt;
		}
		else
		{
			while( (int) $first_day_dt->format( 'w' ) !== $dow )
			{
				$first_day_dt->modify('+1 Day');
			}
			
			return $first_day_dt;
		}
	}
}