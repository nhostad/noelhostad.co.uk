<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Str
{
	public static function decode_path($path)
	{
		return	implode("/", explode("{slash}", 
					implode(".", explode("{dot}", 
						urldecode($path)
					))
				));
	}
	
	public static function encode($input, $percents = TRUE)
	{
		$output = urlencode($input);
		
		if($percents)
		$output = implode( '%20', explode ( '+', $output ) );
		
		return $output;
	}
	
	public static function decode($input, $percents = TRUE)
	{
		return urldecode($input);
	}
	
	public static function get_html_first_line( $input )
	{
		// - TRUNCATE QUESTION TO ITS FIRST LINE IF IT GOES ON TO MORE THAN ONE
		$decoded_text = trim ( $input );
		$lb_pos = strpos($decoded_text, '<br />');
		$cp_pos = strpos($decoded_text, '</p>');
		
		if($lb_pos !== FALSE && $cp_pos === FALSE)
			$decoded_text_truncated = strip_tags( substr( $decoded_text, 0, $lb_pos ) );
			
		else if($lb_pos === FALSE && $cp_pos !== FALSE)
			$decoded_text_truncated = strip_tags( substr( $decoded_text, 0, $cp_pos ) );
			
		else if($lb_pos !== FALSE && $cp_pos !== FALSE)
		{
			$first = min($lb_pos, $cp_pos);
			$decoded_text_truncated = strip_tags( substr( $decoded_text, 0, $first ) );
		}
		else
			$decoded_text_truncated = strip_tags( $decoded_text );
			
		if( strip_tags ( trim ( $decoded_text, ' ' ) ) !== $decoded_text_truncated ) $decoded_text_truncated .= '...';
		///
		
		return $decoded_text_truncated;
	}
	
	public static function generate_random_string ( $length = 10, $exclude_chars = array() )
	{
		$characters = '!@$^&*_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		
		for($i = 0; $i < count ( $exclude_chars ); $i++)
			$characters = implode ( '', explode ( $exclude_chars[$i], $characters ) );
		
		$characters_len = strlen($characters);
		$random_str = '';
		
		for($i = 0; $i < $length; $i++)
			$random_str .= $characters[ rand ( 0, $characters_len - 1) ];
			
		return $random_str;
	}
	
	public static function is_email ( $string )
	{
		return ( preg_match ( '/[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\.\-_]*\.[a-z]*\.?[a-z]*/', $string ) === 1 );
	}
}