<div id="contact">

  <div id="body">

    <?php if ($emailSent) { ?>
    
      <h2>Thank you!</h2>
      <p>Your message was sent succesfully.</p>
      
    <?php } else { ?>
    
      <?php echo form_open('contact'); ?>
      
	  <h5>Your name</h5>
      <?php echo form_input(
        array(
          'name'        => 'Name',
          'id'          => 'Name',
          'value'       => set_value('Name'),
          'maxlength'   => '100',
          'size'        => '40'
        )
      );?>
      <?php echo form_error('Name'); ?>
	  
      <h5>Your email</h5>
      <?php echo form_input(
        array(
          'name'        => 'Email',
          'id'          => 'Email',
          'value'       => set_value('Email'),
          'maxlength'   => '100',
          'size'        => '40'
        )
      );?>
      <?php echo form_error('Email'); ?>
	  
	  <h5>Your subject</h5>
      <?php echo form_input(
        array(
          'name'        => 'Subject',
          'id'          => 'Subject',
          'value'       => set_value('Subject'),
          'maxlength'   => '100',
          'size'        => '40'
        )
      );?>
      <?php echo form_error('Subject'); ?>
      
      <h5>Message</h5>
      <div>
      <?php echo form_textarea(
        array(
          'name'        => 'Message',
          'id'          => 'Message',
          'value'       => set_value('Message'),
          'maxlength'   => '100',
          'size'        => '120'
        )
      );?>
      </div>
      <?php echo form_error('Message'); ?>
      
      <?php // Captcha is only shown if not already solved
      if (!$captchaSolved) { ?>
        <h5>Captcha</h5>
        <div>
        <?php echo $captchaHtml; ?>
        <?php echo form_input(
          array(
            'name'        => 'CaptchaCode',
            'id'          => 'CaptchaCode',
            'value'       => '',
            'maxlength'   => '100',
            'size'        => '50'
          )
        );?>
        </div>
        <?php echo form_error('CaptchaCode'); ?>
      <?php }; // end if(!$captchaSolved) ?>
      
      <div><?php echo form_submit('submit', 'Submit'); ?></div>
    
      </form>
    <?php }; // end if($emailSent) ?>
  </div>
</div>