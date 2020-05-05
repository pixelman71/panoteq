<?php

/*
	* Instagram module show recent images from your Instagram.
	* @author Posthemes (posthemes.com)
	* @coder: hvt. 
	* @version 1.0
*/


	if (!defined('_PS_VERSION_'))
	  exit;	
		
	class PosInstagramBlock extends Module
	{	
		 public function __construct()
		  {
			$this->name = 'posinstagramblock';
			$this->tab = 'front_office_features';
			$this->version = '1.0';
			$this->author = 'posthemes';
			$this->bootstrap = true;
			parent::__construct();
			$this->displayName = $this->l('Instagram images block');
			$this->description = $this->l('Display images from Instagram');
			$this->confirmUninstall = $this->l('Are you sure you want to uninstall?'); 
		}

		public function install()
		{
		  	return parent::install() &&
			$this->registerHook('displayHeader') &&
			$this->registerHook('displayBlockPosition3') &&
			$this->registerHook('displayFooter') &&
			Configuration::updateValue('instagram_id', '3573844619') &&
			Configuration::updateValue('instagram_token', '3573844619.1677ed0.6df51c4079e14ababcacf3b5f16808ce') &&
			Configuration::updateValue('home_items', '7') &&
			Configuration::updateValue('home_limit', '10') &&
			Configuration::updateValue('column_row', '4') &&
			Configuration::updateValue('column_limit', '8');
		  }

		public function uninstall()
		{
		  if (!parent::uninstall() ||
		 	!Configuration::deleteByName('instagram_id')||
		  	!Configuration::deleteByName('instagram_token')||
		  	!Configuration::deleteByName('column_row')||
		  	!Configuration::deleteByName('column_limit')||
		  	!Configuration::deleteByName('home_items')||
		 	!Configuration::deleteByName('home_limit'))
			return false;
		    return true;
		}
		
		public function getContent()
		{
			$output = null;
	
			if (Tools::isSubmit('submit'.$this->name))
			{

				Configuration::updateValue('instagram_id', strval(Tools::getValue('instagram_id')));
				Configuration::updateValue('instagram_token', strval(Tools::getValue('instagram_token')));
				Configuration::updateValue('home_items',  (int)Tools::getValue('home_items'));
				Configuration::updateValue('home_limit',  (int)Tools::getValue('home_limit'));
				Configuration::updateValue('column_row',  (int)Tools::getValue('column_row'));
				Configuration::updateValue('column_limit',  (int)Tools::getValue('column_limit'));

				$output .= $this->displayConfirmation($this->l('Settings updated'));
			}
			return $output.$this->displayForm();
		}
		
		public function displayForm()
		{
			// Get default Language
			$default_lang = (int)Configuration::get('PS_LANG_DEFAULT');
			 
			// Init Fields form array
			$fields_form[0]['form'] = array(
				'legend' => array(
					'title' => $this->l('Settings'),
					'icon' => 'icon-cogs'
				),
				'input' => array(
					array(
						'type' => 'text',
						'label' => $this->l('User Id:'),
						'name' => 'instagram_id',
						'size' => '100',
						'desc' => $this->l('Get Your Instagram Access Token and USER ID: https://smashballoon.com/instagram-feed/find-instagram-user-id/')
					),
						array(
						'type' => 'text',
						'label' => $this->l('Access token:'),
						'name' => 'instagram_token',
						'size' => '100',
						'desc' => $this->l('You need to get your own access token from Instagram. Try this website: http://instagram.pixelunion.net/')
					),
				),
				'submit' => array(
					'title' => $this->l('Save'),
				)	
			);
			$fields_form[1]['form'] = array(
				'legend' => array(
					'title' => $this->l('Instagram on homepage - Carousel'),
					'icon' => 'icon-forward'
				),
				'input' => array(
					array(
						'type' => 'text',
						'label' => $this->l('Number of Images:'),
						'name' => 'home_items',
						'size' => '100',
						'desc' => $this->l('The number of images will be shown on screen.')
					),
					array(
						'type' => 'text',
						'label' => $this->l('Limit of Images:'),
						'name' => 'home_limit',
						'size' => '100',
						'desc' => $this->l('The limit of images will be shown. The maximum is 20.')
					), 
				),
				'submit' => array(
					'title' => $this->l('Save'),
				)	
			);
			$fields_form[2]['form'] = array(
				'legend' => array(
					'title' => $this->l('Instagram on column - Grid'),
					'icon' => 'icon-th'
				),
				'input' => array(
					array(
						'type' => 'text',
						'label' => $this->l('Number image on row'),
						'name' => 'column_row',
						'size' => '100',
						'desc' => $this->l('The number of images will be shown on a row. It only has these values: 1, 2, 3, 4, 6.	')
					),
           			array(
						'type' => 'text',
						'label' => $this->l('Limit of Images:'),
						'name' => 'column_limit',
						'size' => '100',
						'desc' => $this->l('The limit of images will be shown. The maximum is 20.')
					)
				),
				'submit' => array(
					'title' => $this->l('Save'),
				)	
			);
		
				
	$helper = new HelperForm();
    // Module, token and currentIndex
    $helper->module = $this;
    $helper->name_controller = $this->name;
    $helper->token = Tools::getAdminTokenLite('AdminModules');
    $helper->currentIndex = AdminController::$currentIndex.'&configure='.$this->name;

    // Language
    $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
    $helper->default_form_language = $lang->id;
    $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;

    // Title and toolbar
    $helper->title = $this->displayName;
	
    $helper->show_toolbar = true;        // false -> remove toolbar
    $helper->toolbar_scroll = true;      // yes - > Toolbar is always visible on the top of the screen.
    $helper->submit_action = 'submit'.$this->name;
	
    $helper->toolbar_btn = array(
        'save' =>
        array(
            'desc' => $this->l('Save'),
            'href' => AdminController::$currentIndex.'&configure='.$this->name.'&save'.$this->name.
                '&token='.Tools::getAdminTokenLite('AdminModules'),
        ),
        'back' => array(
            'href' => AdminController::$currentIndex.'&token='.Tools::getAdminTokenLite('AdminModules'),
            'desc' => $this->l('Back to list')
        )
    );
				 
	// Load current value
	$helper->fields_value['instagram_id'] = Configuration::get('instagram_id');
	$helper->fields_value['instagram_token'] = Configuration::get('instagram_token');
	$helper->fields_value['home_items'] = Configuration::get('home_items');
	$helper->fields_value['home_limit'] = Configuration::get('home_limit');
	$helper->fields_value['column_row'] = Configuration::get('column_row');
	$helper->fields_value['column_limit'] = Configuration::get('column_limit');
	return $helper->generateForm($fields_form);
	}
				
		// Display module
		public function hookDisplayBlockPosition2($params)
	{	
		$instagrams= array();

		$instagram_id = Configuration::get('instagram_id');
		$instagram_token= Configuration::get('instagram_token');
		$limit = Configuration::get('home_limit');
		$json = file_get_contents("https://api.instagram.com/v1/users/$instagram_id/media/recent/?access_token=$instagram_token&count=$limit");
		$instagram_arrays = json_decode($json,true);
		$instagram_arrays = $instagram_arrays['data'];
		
		$username = $instagram_arrays[0]['user']['username'];

		foreach($instagram_arrays as $instagram_array) {
			$instagrams[]= array(
		 		'likes' => $instagram_array['likes']['count'],
		 		'thumbnail' => $instagram_array['images']['thumbnail']['url'],
		 		'image' => $instagram_array['images']['standard_resolution']['url'],
				'low_resolution' => $instagram_array['images']['low_resolution']['url'],
		 		'link'  => $instagram_array['link'],
		 		'created_time' => date('m/d/Y', $instagram_array['created_time']),
		 		'comment' => $instagram_array['comments']['count'],
		 		'caption' => $instagram_array['caption']['text'],
		 	);
		};
		
		$this->smarty->assign(array(
            'instagrams'              => $instagrams,
            'home_items'              => Configuration::get('home_items'),
            'username'                => $username,
        ));
		return $this->display(__FILE__, 'blockinstagram_home.tpl');
	}	
	public function hookDisplayBlockPosition3($params)
	{	
		$instagrams= array();

		$instagram_id = Configuration::get('instagram_id');
		$instagram_token= Configuration::get('instagram_token');
		$limit = Configuration::get('home_limit');
		$json = file_get_contents("https://api.instagram.com/v1/users/$instagram_id/media/recent/?access_token=$instagram_token&count=$limit");
		$instagram_arrays = json_decode($json,true);
		$instagram_arrays = $instagram_arrays['data'];
		
		$username = $instagram_arrays[0]['user']['username'];

		foreach($instagram_arrays as $instagram_array) {
			$instagrams[]= array(
		 		'likes' => $instagram_array['likes']['count'],
		 		'thumbnail' => $instagram_array['images']['thumbnail']['url'],
		 		'image' => $instagram_array['images']['standard_resolution']['url'],
				'low_resolution' => $instagram_array['images']['low_resolution']['url'],
		 		'link'  => $instagram_array['link'],
		 		'created_time' => date('m/d/Y', $instagram_array['created_time']),
		 		'comment' => $instagram_array['comments']['count'],
		 		'caption' => $instagram_array['caption']['text'],
		 	);
		};
		
		$this->smarty->assign(array(
            'instagrams'              => $instagrams,
            'home_items'              => Configuration::get('home_items'),
            'username'                => $username,
        ));
		return $this->display(__FILE__, 'blockinstagram_home.tpl');
	}
	public function hookDisplayFooter($params)
	{
		$instagrams= array();

		$instagram_id = Configuration::get('instagram_id');
		$instagram_token= Configuration::get('instagram_token');
		$limit = Configuration::get('column_limit');
		$json = file_get_contents("https://api.instagram.com/v1/users/$instagram_id/media/recent/?access_token=$instagram_token&count=$limit");
		$instagram_arrays = json_decode($json,true);
		$instagram_arrays = $instagram_arrays['data'];
		
		$username = $instagram_arrays[0]['user']['username'];
		
		foreach($instagram_arrays as $instagram_array) {
			$instagrams[]= array(
		 		'likes' => $instagram_array['likes']['count'],
		 		'thumbnail' => $instagram_array['images']['thumbnail']['url'],
		 		'image' => $instagram_array['images']['standard_resolution']['url'],
		 		'link'  => $instagram_array['link'],
		 		'created_time' => date('m/d/Y', $instagram_array['created_time']),
		 		'comment' => $instagram_array['comments']['count'],
		 		'caption' => $instagram_array['caption']['text'],
		 	);
		};
		
		$this->smarty->assign(array(
            'instagrams'  => $instagrams,
            'row'         => Configuration::get('column_row'),
            'username'    => $username,
        ));
		return $this->display(__FILE__, 'blockinstagram.tpl');
	}

	public function hookDisplayHeader()
	{
	  $this->context->controller->addCSS($this->_path.'css/jquery.fancybox.css', 'all');
	  $this->context->controller->addJS($this->_path.'js/jquery.fancybox.js');
	  
	} 
}
?>