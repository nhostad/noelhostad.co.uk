<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Contact extends CI_Controller {

	public function index() {
		// Captcha parameters:
		$captchaConfig = array(
		  'CaptchaId' => 'FormCaptcha', // a unique Id for the Captcha instance
		  'UserInputId' => 'CaptchaCode' // Id of the Captcha code input textbox
		);
		// load the BotDetect Captcha library
		$this->load->library('botdetect/BotDetectCaptcha', $captchaConfig);

		$this->load->helper(array('form', 'html', 'url'));
		$this->load->library(array('form_validation', 'email'));

		$this->form_validation->set_error_delimiters('<p class="validation_errors">
		  ', '</p>');

		$validationConfig = array(
		  array(
			'field'   => 'Email', 
			'label'   => 'Email', 
			'rules'   => 'required|valid_email'
		  ),
		  array(
			'field'   => 'Message', 
			'label'   => 'Message', 
			'rules'   => 'required|min_length[6]'
		  ),
		  array( // Captcha code user input validation rules
			'field'   => 'CaptchaCode', 
			'label'   => 'Captcha code', 
			'rules'   => 'callback_captcha_validate'
		  )
		);
		$this->form_validation->set_rules($validationConfig);

		$data['emailSent'] = false;

		if ($_POST) {
		  // run form validation when the form is submitted
		  if ( $this->form_validation->run() == true ) {
			// the form validation (including Captcha validation) passed, send 
			// email; we'll include some code showing how to send mail from
			// CodeIgniter, but please note that this code is not production
			// safe, and is simplified for the purposes of this example
			$from = $this->input->post ( 'Email' );
			$fromName = $this->input->post ( 'Name' );
			$subject = $this->input->post ( 'Subject' );
			$message = $this->input->post ( 'Message' );
			$message = implode ( "<br>", explode ( "\r\n", $message ) );

			$config = array();
			$config['useragent']           = "CodeIgniter";
			$config['mailpath']            = "/usr/sbin/sendmail"; // or "/usr/sbin/sendmail"
			$config['protocol']            = "smtp";
			$config['smtp_host']           = "mail.juice-elearning.co.uk";
			//$config['smtp_port']           = "25";
			$config['mailtype'] = 'html';
			//$config['charset']  = 'utf-8';
			//$config['newline']  = "\r\n";
			//$config['wordwrap'] = TRUE;
			//$config['send_multipart'] = TRUE;

			$this->email->initialize($config);

			$this->email->from ( $from, $fromName );
			$this->email->to ( 'noel@juice-e.co.uk' );
			$this->email->subject ( $subject );
			$this->email->message ( $message );

			$this->email->set_mailtype("html");

			// TODO: uncomment only after you have configured your email settings
			$this->email->send();

			//echo $this->email->print_debugger();
			// reset Captcha status after each email sent, since we don't want the 
			// user to  be able to send an unlimited number of emails after solving
			// the Captcha once
			$this->botdetectcaptcha->Reset();

			$data['emailSent'] = true;
			} else {
				// the form validation failed, don't send email
			}
		}

		// the Captcha is not shown if the user already solved it but validation 
		// of other form fields failed
		if(!$this->botdetectcaptcha->IsSolved) {
			$data['captchaSolved'] = false;
			$data['captchaHtml'] = $this->botdetectcaptcha->Html();
		} else {
			$data['captchaSolved'] = true;
			$data['captchaHtml'] = '';
		}

		// - ALPHA
		$this->load->view('main/alpha.html', array(
			'title' => 'Juice E-learning - Contact Form',
			'extra_css' => array(
				array ( 'address' => base_url() . 'css/base.css', 'absolute' => TRUE),
				'css/contact/base.css',
				'css/contact/colours.css',
				'css/contact/text.css',
				'css/sidebar/base.css',
				'css/sidebar/colours.css',
				'css/sidebar/text.css',
				array ( 'address' => CaptchaUrls::LayoutStylesheetUrl(), 'absolute' => TRUE),
			),
			'extra_js' => array(),
		));

		// - TOP BAR
		$this->load->view('main/top_bar.html', array(
			'extra_views' => array(
				array('view' => 'main/header.html', 'vars' => array()),
				array('view' => 'contact/header.html', 'vars' => array()),
			),
		));

		// - CONTAINER
		$this->load->view('main/container.html', array(
			'extra_views' => array(
				array('view' => 'contact/main_content.php', 'vars' => $data),
				array('view' => 'sidebar/main_content.html', 'vars' => array('colour_class' => 'pink')),
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

	// Captcha validation callback used in form validation
	public function captcha_validate($code) {
	// user considered human if they previously solved the Captcha...
	$isHuman = $this->botdetectcaptcha->IsSolved;
	if (!$isHuman) {
	  // ...or if they solved the current Captcha
	  $isHuman = $this->botdetectcaptcha->Validate($code);
	}

	// set error if Captcha validation failed
	if (!$isHuman) {
	  $this->form_validation->set_message('captcha_validate', 'Please retype 
		the characters from the image correctly.');
	}

	return $isHuman;
	}
  
  
  
	public function ajax_submit_form()
	{
		$this->load->library(array('email'));
		
		$data = array();
		
		$from = $this->input->post ( 'Email' );
		$fromName = $this->input->post ( 'Name' );
		$subject = $this->input->post ( 'Subject' );
		$message = $this->input->post ( 'Message' );
		$message = implode ( "<br>", explode ( "\r\n", $message ) );

		$config = array();
		$config['useragent']           = "CodeIgniter";
		$config['mailpath']            = "/usr/sbin/sendmail"; // or "/usr/sbin/sendmail"
		$config['protocol']            = "smtp";
		$config['smtp_host']           = "mail.noelhostad.co.uk";
		//$config['smtp_port']           = "25";
		$config['mailtype'] = 'html';
		//$config['charset']  = 'utf-8';
		//$config['newline']  = "\r\n";
		//$config['wordwrap'] = TRUE;
		//$config['send_multipart'] = TRUE;

		$this->email->initialize($config);

		$this->email->from ( $from, $fromName );
		$this->email->to ( 'noel@juice-e.co.uk' );
		$this->email->subject ( $subject );
		$this->email->message ( $message );

		$this->email->set_mailtype("html");

		// TODO: uncomment only after you have configured your email settings
		$this->email->send();

		$data['emailSent'] = true;
		echo json_encode ( $this->input->post );
		echo $from . ' ' . $fromName . ' ' . $subject . ' ' . $message;
	}
}
