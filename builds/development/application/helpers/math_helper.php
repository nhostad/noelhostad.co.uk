<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MathNH
{
	public static function alz($input, $str_len)
	{
		$output = (string) $input;
		
		while( strlen( $output ) < $str_len )
			$output = '0' . $output;
		
		return $output;
	}
}