<?php
if (!defined('_PS_VERSION_'))
    exit;

// Loading Models
include_once(_PS_MODULE_DIR_ . 'postestimonials/libs/Params.php');
include_once(_PS_MODULE_DIR_ . 'postestimonials/classes/PosTestimonial.php');
class Postestimonials extends Module
{
   private $_html = '';
   protected $params = null;
   const INSTALL_SQL_FILE = 'install.sql';
   const UNINSTALL_SQL_FILE = 'uninstall.sql';
   public function __construct()
        {
            $this->name ='postestimonials';
            $this->version = '1.6';
            $this->author = 'posthemes';
            $this->bootstrap = true;
            $this->tab = 'front_office_features';
            $this->need_instance = 0;
			$this->ps_versions_compliancy = [
				'min' => '1.7',
				'max' => _PS_VERSION_,
			];
            parent::__construct();
            $this->displayName = $this->l('Pos Testimonials ');
            $this->description = $this->l('Module manager Testimonials');
            $this->_searched_email = null;
            $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
            $this->_params = new Params($this->name, $this);
        }

    public function initConfigs()
        {
            return array(
                'test_limit' => 10,
                'type_image' => 'png|jpg|gif',
                'type_video' => 'flv|mp4|avi',
                'size_limit' => 6,
                'captcha' => 0,
                'auto_post' => 1,
            );
        }

    public function install()
    {
        if (parent::install() && $this->registerHook('displayBlockPosition1') && $this->registerHook('displayHeader')) {

            $res = $this->installDb();
            if(!(int)Tab::getIdFromClassName('AdminPosMenu')) {
                $parent_tab = new Tab();
                // Need a foreach for the language
                $parent_tab->name[$this->context->language->id] = $this->l('PosExtentions');
                $parent_tab->class_name = 'AdminPosMenu';
                $parent_tab->id_parent = 0; // Home tab
                $parent_tab->module = $this->name;
                $parent_tab->add();
            }
            $tab = new Tab();
            // Need a foreach for the language
            foreach (Language::getLanguages() as $language)
                $tab->name[$language['id_lang']] = $this->l('Manage Testimonials');
            $tab->class_name = 'AdminTestimonials';
            $tab->id_parent = (int)Tab::getIdFromClassName('AdminPosMenu');
            $tab->module = $this->name;
            $tab->add();
            $configs = $this->initConfigs();
            $this->_params->batchUpdate($configs);
			$this->installSampleData();
            return (bool)$res;
        }
        return false;
    }

    public function uninstall()
    {
        if (parent::uninstall()) {
            $res = $this->uninstallDb();
            $tab = new Tab((int) Tab::getIdFromClassName('AdminTestimonials'));
            $tab->delete();
          //  $res &= $this->uninstallModuleTab('AdminPosMenu');
            return (bool)$res;
        }
        return false;
    }
	
	    private function installSampleData(){
        $languages = Language::getLanguages(false);
        Db::getInstance()->execute('
            INSERT INTO `'._DB_PREFIX_.'postestimonial` (`id_postestimonial`,`email`,`media`,`media_type`,`active`,`position`)  VALUES ("1","demo@posthemes.com","sample1.png","png","1","1");
            INSERT INTO `'._DB_PREFIX_.'postestimonial` (`id_postestimonial`,`email`,`media`,`media_type`,`active`,`position`)  VALUES ("2","demo@posthemes.com","sample2.png","png","1","2");
            INSERT INTO `'._DB_PREFIX_.'postestimonial` (`id_postestimonial`,`email`,`media`,`media_type`,`active`,`position`)  VALUES ("3","demo@posthemes.com","sample3.png","png","1","3")');
        foreach($languages as $lang){
            Db::getInstance()->execute('
                INSERT INTO `'._DB_PREFIX_.'postestimonial_lang` (`id_postestimonial`,`id_lang`,`name_post`,`address`,`content`)  VALUES ("1",'.$lang['id_lang'].',"orando BLoom"," No 40 Baria Sreet 133/2, NewYork, USA.","Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram.");
                INSERT INTO `'._DB_PREFIX_.'postestimonial_lang` (`id_postestimonial`,`id_lang`,`name_post`,`address`,`content`)  VALUES ("2",'.$lang['id_lang'].',"orando BLoom"," No 40 Baria Sreet 133/2, NewYork, USA.","Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram.");
                INSERT INTO `'._DB_PREFIX_.'postestimonial_lang` (`id_postestimonial`,`id_lang`,`name_post`,`address`,`content`)  VALUES ("3",'.$lang['id_lang'].',"orando BLoom"," No 40 Baria Sreet 133/2, NewYork, USA.","Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram.")');
        }
        Db::getInstance()->execute('
            INSERT INTO `'._DB_PREFIX_.'postestimonial_shop` (`id_postestimonial`,`id_shop`)  VALUES ("1","1");
            INSERT INTO `'._DB_PREFIX_.'postestimonial_shop` (`id_postestimonial`,`id_shop`)  VALUES ("2","1");
            INSERT INTO `'._DB_PREFIX_.'postestimonial_shop` (`id_postestimonial`,`id_shop`)  VALUES ("3","1")');
    }

    public function installDb(){
        $res = Db::getInstance()->execute(
            'CREATE TABLE IF NOT EXISTS `'._DB_PREFIX_.'postestimonial` (
            `id_postestimonial` int(11) NOT NULL AUTO_INCREMENT,
			`email` varchar(100) NOT NULL,
			`media_link` varchar(500) DEFAULT NULL,
            `media_link_id` varchar(20) DEFAULT NULL,
            `media` varchar(255) DEFAULT NULL,
            `media_type` varchar(25) DEFAULT NULL,
            `date_add` datetime DEFAULT NULL,
            `active` tinyint(1) DEFAULT NULL,
            `position` int(11) DEFAULT NULL ,
            PRIMARY KEY (`id_postestimonial`))
            ENGINE='._MYSQL_ENGINE_.' DEFAULT CHARSET=utf8 AUTO_INCREMENT=1'
        );
		
	   
           $res = Db::getInstance()->execute(
				'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'postestimonial_lang` (
				`id_postestimonial` int(11) unsigned NOT NULL,
				`id_lang` int(11) unsigned NOT NULL,
				 `name_post` varchar(100) NOT NULL,
				 `company` varchar(255) DEFAULT NULL,
				 `address` varchar(500) NOT NULL,
				 `content` text NOT NULL,
				PRIMARY KEY (`id_postestimonial`,`id_lang`)
				) ENGINE = ' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8'
			  );
		
        if ($res)
            $res &= Db::getInstance()->execute(
        'CREATE TABLE IF NOT EXISTS `'._DB_PREFIX_.'postestimonial_shop` (
        `id_postestimonial` int(10) unsigned NOT NULL,
        `id_shop` int(10) unsigned NOT NULL,
        PRIMARY KEY (`id_postestimonial`,`id_shop`))
        ENGINE='._MYSQL_ENGINE_.' DEFAULT CHARSET=utf8');
        return (bool)$res;
    }


    private function uninstallDb() {
    Db::getInstance()->execute('DROP TABLE `'._DB_PREFIX_.'postestimonial`');
    Db::getInstance()->execute('DROP TABLE `'._DB_PREFIX_.'postestimonial_lang`');
    Db::getInstance()->execute('DROP TABLE `'._DB_PREFIX_.'postestimonial_shop`');
    return true;
}

      public function getContent()
    {
        $this->_html .= '<h2>' . $this->displayName . ' and Custom Fields.</h2>';
        if (Tools::isSubmit('submitUpdate')) {
            if ($this->_postValidation()) {
                $configs = $this->initConfigs();
               $res = $this->_params->batchUpdate($configs);
                if (!$res) {
                    $this->_html .= $this->displayError($this->l('Configuration could not be updated'));
                } else {
                    $this->_html .= $this->displayConfirmation($this->l('Configuration updated'));
                }
            }
        }
		$url  = 'index.php?controller=AdminTestimonials';
		$url .= '&token='.Tools::getAdminTokenLite('AdminTestimonials');
		$link_module ='<div class="link_module bootstrap panel"><a href="'.$url.'">'.$this->l('Go to Manager Testimonial').'</div>';
        return $this->_html . $this->initForm().$link_module;
    }
    protected function initForm()
    {
        $configs = $this->initConfigs();
        $params = $this->_params;
        $this->fields_form[0]['form'] = array(
            'legend' => array(
                'title' => $this->l('Global Setting'),
                'icon' => 'icon-cogs'
            ),
            'input' => array(
                $params->inputTags('test_limit', 'Testimonial Limit:', false, 'The number items on a page.'),
                $params->inputTags('type_image', 'Image type:', false, 'allow upload image type.'),
                $params->inputTags('type_video', 'Video type:', false, 'allow upload video type.'),
                $params->inputTags('size_limit', 'Size limit upload:', false, 'Mb .Max size file upload.'),
                $params->switchTags('captcha', 'Display captcha:'),
                $params->switchTags('auto_post', 'Admin approve', 'Admin can set enable or disable auto post'),
            ),
            'submit' => array(
                'title' => $this->l('Save'),
            )
        );
        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitUpdate';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false) . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = $this->context->language->id;
        $helper->tpl_vars = array(
            'fields_value' => $params->getConfigFieldsValues($configs),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id
        );
        return $helper->generateForm($this->fields_form);
    }
    public function _postValidation()
    {
        $errors = array();
        if (Tools::isSubmit('submitUpdate')) {
            if (!Tools::getValue(('test_limit')) || !Validate::isInt(Tools::getValue('test_limit')))
                $errors[] = $this->l('False! Check again with testimonial limit.');
            if (!Tools::getValue('size_limit') || !Validate::isInt(Tools::getValue('size_limit')))
                $errors[] = $this->l('False! Check again with size upload limit.');
        }
        if (count($errors)) {
            $this->_html .= $this->displayError(implode('<br />', $errors));
            return false;
        }
        return true;
    }

    public function getParams()
    {
        return $this->_params;
    }

	public function hookDisplayHeader($params)
	{
		$this->context->controller->addCSS('/css/style.css', 'all');
	}
	
	public function hookdisplayBlockPosition1($params)
    {
        $testLimit = $this->getParams()->get('test_limit');
        $get_testimonials = PosTestimonial::getAllTestimonials($testLimit);
        $img_types = explode('|', $this->getParams()->get('type_image'));
        $video_types = explode('|', $this->getParams()->get('type_video'));
        $this->context->smarty->assign(array(
            'testimonials' => $get_testimonials,
            'arr_img_type' => $img_types,
            'video_types' => $video_types,
            'mediaUrl' => _PS_IMG_ . 'postestimonial/',
            'video_post' => _MODULE_DIR_ . $this->name . '/img/video.jpg',
            'video_youtube' => _MODULE_DIR_ . $this->name . '/img/youtube.jpg',
            'video_vimeo' => _MODULE_DIR_ . $this->name . '/img/vimeo.jpg',
        ));
        return $this->display(__FILE__,'/views/templates/front/testimonials_random.tpl');
    }

	
}
