<?php

// Security
if (!defined('_PS_VERSION_'))
    exit;

// Checking compatibility with older PrestaShop and fixing it
if (!defined('_MYSQL_ENGINE_'))
    define('_MYSQL_ENGINE_', 'MyISAM');

// Loading Models
require_once(_PS_MODULE_DIR_ . 'panoteq/src/Entity/PanoteqConfiguration.php');

class panoteq extends Module implements PrestaShop\PrestaShop\Core\Module\WidgetInterface
{
    private $_html = '';
    private $_postErrors = array();

    public function __construct()
    {
        $this->name = 'panoteq';
        $this->tab = 'front_office_features';
        $this->version = '1.0';
        $this->author = 'Alexandre Dupuis-Belin';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);

        parent::__construct();

        $this->displayName = $this->l('Panoteq');
        $this->description = $this->l('panoteq configurator');

        $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
        $this->admin_tpl_path = _PS_MODULE_DIR_ . $this->name . '/views/templates/admin/';
    }


    public function install()
    {
//        //create folder blocklogo
//        $path = _PS_IMG_DIR_.'blocklogo';
//        if (!file_exists($path)) {
//            mkdir($path, 0777, true);
//        }

        // Install SQL
        include(dirname(__FILE__) . '/sql/install.php');
        foreach ($sql as $s)
            if (!Db::getInstance()->execute($s))
                return false;

        // Install Tabs
        if (!(int)Tab::getIdFromClassName('AdminPanoteqMenu')) {
            $parent_tab = new Tab();
            // Need a foreach for the language
            foreach (Language::getLanguages() as $language)
                $parent_tab->name[$language['id_lang']] = $this->l('Panoteq');
            $parent_tab->class_name = 'AdminPanoteqMenu';
            $parent_tab->id_parent = 0; // Home tab
            $parent_tab->module = $this->name;
            $parent_tab->add();
        }

        $tab = new Tab();
        // Need a foreach for the language
        //$tab->name[$this->context->language->id] = $this->l('Manage Logo');
        foreach (Language::getLanguages() as $language)
            $tab->name[$language['id_lang']] = $this->l('Configurator');
        $tab->class_name = 'AdminPanoteq';
        $tab->id_parent = (int)Tab::getIdFromClassName('AdminPanoteqMenu');
        $tab->module = $this->name;
        $tab->add();
//                Configuration::updateValue($this->name . '_auto', 0);
//                Configuration::updateValue($this->name . '_speed_slide', '3000');
//                Configuration::updateValue($this->name . '_a_speed', '600');
//                Configuration::updateValue($this->name . '_qty_products', 30);
//                Configuration::updateValue($this->name . '_qty_items', 9);
//                Configuration::updateValue($this->name . '_width_item', 180);
//                Configuration::updateValue($this->name . '_show_nextback', 1);
//                Configuration::updateValue($this->name . '_show_control', 0);
//                Configuration::updateValue($this->name . '_min_item', 1);
//                Configuration::updateValue($this->name . '_max_item', 6);
//                Configuration::updateValue($this->name . '_mode_dir', 'vertical');

        // Set some defaults
        return parent::install()
            && $this->registerHook('actionAdminControllerSetMedia');
//            && $this->registerHook('displayCustomization');
//            && $this->registerHook('backOfficeHeader')
//            && $this->registerHook('displayBackOfficeHeader');
//		 $this->_installHookCustomer()&&
//		 $this->registerHook('displayHeader');
    }

    public function uninstall()
    {

        Configuration::deleteByName('panoteq');

        // Uninstall Tabs

        $tab = new Tab((int)Tab::getIdFromClassName('AdminPanoteq'));
        $tab->delete();
//		Configuration::deleteByName($this->name . '_auto');
//        Configuration::deleteByName($this->name . '_speed_slide');
//        Configuration::deleteByName($this->name . '_a_speed');
//       // Configuration::deleteByName($this->name . '_show_price');
//        //Configuration::deleteByName($this->name . '_show_des');
//        Configuration::deleteByName($this->name . '_qty_products');
//        Configuration::deleteByName($this->name . '_qty_items');
//        Configuration::deleteByName($this->name . '_width_item');
//        Configuration::deleteByName($this->name . '_show_nextback');
//        Configuration::deleteByName($this->name . '_show_control');
//        Configuration::deleteByName($this->name . '_min_item');
//        Configuration::deleteByName($this->name . '_max_item');
//        Configuration::deleteByName($this->name . '_mode_dir');

        include(dirname(__FILE__) . '/sql/uninstall_sql.php');
        foreach ($sql as $s)
            if (!Db::getInstance()->execute($s))
                return false;
        // Uninstall Module
        if (!parent::uninstall())
            return false;
        // !$this->unregisterHook('actionObjectExampleDataAddAfter')
        return true;
    }


    private function _postProcess()
    {
//            Configuration::updateValue($this->name . '_auto', Tools::getValue('auto'));
//            Configuration::updateValue($this->name . '_speed_slide', Tools::getValue('speed_slide'));
//            Configuration::updateValue($this->name . '_a_speed', Tools::getValue('a_speed'));
//            //Configuration::updateValue($this->name . '_show_price', Tools::getValue('show_price'));
//            //Configuration::updateValue($this->name . '_show_des', Tools::getValue('show_des'));
//            Configuration::updateValue($this->name . '_qty_products', Tools::getValue('qty_products'));
//            Configuration::updateValue($this->name . '_qty_items', Tools::getValue('qty_items'));
//            Configuration::updateValue($this->name . '_width_item', Tools::getValue('width_item'));
//            Configuration::updateValue($this->name . '_show_nextback', Tools::getValue('show_nextback'));
//            Configuration::updateValue($this->name . '_show_control', Tools::getValue('show_control'));
//            Configuration::updateValue($this->name . '_min_item', Tools::getValue('min_item'));
//            Configuration::updateValue($this->name . '_max_item', Tools::getValue('max_item'));
//            Configuration::updateValue($this->name . '_mode_dir', Tools::getValue('mode_dir'));

        $this->_html .= '<div class="conf confirm">' . $this->l('Settings updated') . '</div>';
    }

//    public function getContent()
//    {
//        $this->_html .= '<h2>' . $this->displayName . '</h2>';
//
//        if (Tools::isSubmit('submitPostLogo')) {
//            //$this->_postValidation();
//
//            if (!sizeof($this->_postErrors))
//                $this->_postProcess();
//            else {
//                foreach ($this->_postErrors AS $err) {
//                    $this->_html .= '<div class="alert error">' . $err . '</div>';
//                }
//            }
//        }
//
//        $this->_displayForm();
//
//        return $this->_html;
//    }


    public function getAttrFromImage($image = NULL)
    {
        $doc = new DOMDocument();
        $doc->loadHTML($image);
        $imageTags = $doc->getElementsByTagName('img');
        foreach ($imageTags as $tag) {
            if ($tag->getAttribute('src')) {
                return $tag->getAttribute('src');
                break;
            }
        }
        return NULL;
    }

//    public function getLogo()
//    {
//        $id_shop = (int)Context::getContext()->shop->id;
//        $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'pos_logo` ps LEFT JOIN `' . _DB_PREFIX_ . 'pos_logo_shop`  s ON ps.id_pos_logo = s.id_pos_logo where s.`id_shop` =' . $id_shop . '  ORDER BY `porder` ASC';
//        $slides = Db::getInstance()->ExecuteS($sql);
//        if (is_array($slides)) {
//            $limit = 0;
//            $arraySlides = array();
//            foreach ($slides as $key => $slideArray) {
//                if ($limit == Configuration::get($this->name . '_qty_products')) break;
//                $limit++;
//                //echo "<pre>"; print_r($slideArray);
//                $newSlide = array();
//                foreach ($slideArray as $k => $v) {
//                    if ($k == 'image') {
//                        $v = _PS_BASE_URL_ . __PS_BASE_URI__ . 'img/blocklogo/' . $slideArray['id_pos_logo'] . '.jpg';
//                    }
//                    $newSlide[$k] = $v;
//                }
//                $arraySlides[$key] = $newSlide;
//            }
//
//        }
//        return $arraySlides;
//    }


//    public function getSelectOptionsHtml($options = NULL, $name = NULL, $selected = NULL)
//    {
//        $html = "";
//        $html .= '<select name =' . $name . ' style="width:130px">';
//        if (count($options) > 0) {
//            foreach ($options as $key => $val) {
//                if (trim($key) == trim($selected)) {
//                    $html .= '<option value=' . $key . ' selected="selected">' . $val . '</option>';
//                } else {
//                    $html .= '<option value=' . $key . '>' . $val . '</option>';
//                }
//            }
//        }
//        $html .= '</select>';
//        return $html;
//    }

//    private function _displayForm()
//    {
//        $this->_html .= '
//		<form action="' . $_SERVER['REQUEST_URI'] . '" method="post">
//                  <fieldset>
//                    <legend><img src="../img/admin/edit.gif" alt="" class="middle" />' . $this->l('Settings') . '</legend>
//                    <div class="margin-form">';
//        $this->_html .= '
//                    </div>
//                     <label>' . $this->l('Qty of Logos  : ') . '</label>
//                    <div class="margin-form">
//                            <input type = "text"  name="qty_products" value =' . (Tools::getValue('qty_products') ? Tools::getValue('qty_products') : Configuration::get($this->name . '_qty_products')) . ' ></input>
//                    </div>
//                     <div class="margin-form">';
//        $this->_html .= '
//                    </div>
//                    <input type="submit" name="submitPostLogo" value="' . $this->l('Update') . '" class="button" />
//                     </fieldset>
//		</form>';
//        $url = 'index.php?controller=AdminPosLogo';
//        $url .= '&token=' . Tools::getAdminTokenLite('AdminPosLogo');
//        $this->_html .= '<div class="link_module bootstrap panel"><a href="' . $url . '">Go to Manager Logo</div>';
//        return $this->_html;
//        return $this->_html;
//    }

//    public function hookDisplayHeader()
//    {
//        $this->context->controller->addJS($this->_path . 'js/poslogo.js');
//    }

//    function hookdisplayBrandSlider($params)
//    {
//        $options = array(
//            'auto' => Configuration::get($this->name . '_auto'),
//            'speed_slide' => Configuration::get($this->name . '_speed_slide'),
//            'a_speed' => Configuration::get($this->name . '_a_speed'),
//            'qty_products' => Configuration::get($this->name . '_qty_products'),
//            'qty_items' => Configuration::get($this->name . '_qty_items'),
//            'width_item' => Configuration::get($this->name . '_width_item'),
//            'show_nexback' => Configuration::get($this->name . '_show_nextback'),
//            'show_control' => Configuration::get($this->name . '_show_control'),
//            'min_item' => Configuration::get($this->name . '_min_item'),
//            'max_item' => Configuration::get($this->name . '_max_item'),
//            'mode_dir' => Configuration::get($this->name . '_mode_dir'),
//        );
//
//
//        $logos = $this->getLogo();
//        if (count($logos) < 1) return NULL;
//        $this->context->smarty->assign('slideOptions', $options);
//        $this->context->smarty->assign('logos', $logos);
//        return $this->display(__FILE__, 'logo.tpl');
//    }

//    private function _installHookCustomer()
//    {
//        $hookspos = array(
//            'panoteq',
//        );
//        foreach ($hookspos as $hook) {
//            if (Hook::getIdByName($hook)) {
//
//            } else {
//                $new_hook = new Hook();
//                $new_hook->name = pSQL($hook);
//                $new_hook->title = pSQL($hook);
//                $new_hook->add();
//                $id_hook = $new_hook->id;
//            }
//        }
//        return true;
//    }

    public function hookBackOfficeHeader($params)
    {
//        $this->context->controller->addCSS($this->_path.'mycss.css');
    }

    public function hookDisplayBackOfficeHeader($params)
    {
//        $this->hookBackOfficeHeader($params);
    }

    public function hookActionAdminControllerSetMedia($params)
    {
        // Adds your's CSS file from a module's directory
        $this->context->controller->addCSS($this->_path . 'views/css/example.css');
        $this->context->controller->addCSS($this->_path . 'views/node_modules/jsoneditor/dist/jsoneditor.min.css');

        // Adds your's JavaScript file from a module's directory
        $this->context->controller->addJS($this->_path . 'views/js/example.js');
        $this->context->controller->addJS($this->_path . 'views/node_modules/jsoneditor/dist/jsoneditor.js');
    }

    public function widgetRequiresCompletion() {

    }

    public function getStepsNoDuplicateValues($model)
    {
        $steps = [];
        $modelValuesAlreadyChecked = [];

        foreach ($model->steps as $step) {
            if(!isset($step->value_id)) {
                continue;
            }

//            if (!this . modelWidgets[step . id] . requiresCompletion()) {
//                return
//                }
            if(isset($modelValuesAlreadyChecked[$step->value_id])) {
                // Is duplicate (accessing same value). Do not count in.
                continue;
            }

            $modelValuesAlreadyChecked[$step->value_id] = $step->value_id;

            $steps[] = $step;
        }

        return $steps;
    }

    public function formatProductCustomization($productCustomizationSerialized)
    {
        $productCustomization = json_decode($productCustomizationSerialized);
        if ($productCustomization === null) {
            // Unable to decode: return raw value
            return $productCustomizationSerialized;
        }

        $panoteqConfigurationFound = (Db::getInstance())
            ->getRow('select * from ' . _DB_PREFIX_ . 'panoteq_configuration 
            ORDER BY id_panoteq_configuration DESC');

        $panoteqConfiguration = json_decode($panoteqConfigurationFound['contents']);

        $result = '';

        foreach ($this->getStepsNoDuplicateValues($panoteqConfiguration) as $step) {
            if (!isset($step->value_id)) {
                continue;
            }

            if (!isset($productCustomization->values[$step->value_id])) {
                continue;
            }

            $value = $productCustomization->values[$step->value_id];

            $rowResult = $step->label . ' : ';

            switch ($step->widget_type) {
                case 'color-sample':
                case 'color':
                    $explodedParts = explode('/', $value);
                    $rowResult .= $explodedParts[count($explodedParts) - 1];
                    break;
                case 'dimensions':
                    $rowResult .= $value->width . $step->suffix . ' x ' . $value->height . $step->suffix;
                    break;
                case 'text':
                    $rowResult .= 'text';
                    break;
                default:
                    $rowResult .= $value;
                    break;
            }

            $result .= $rowResult . "<br />";
        }

        return $result;

        //{"schemaVersion":1,"values":["/img/panoteqconf/textures/Ambassador.jpg",null,null,[{"value":1}],{"width":3,"height":4},null,[{"value":1}],null]}Personnalisation
    }

    public function renderWidget($hookName, array $configuration)
    {
        return $this->formatProductCustomization($configuration['productConfiguration']['text']);
    }

    public function getWidgetVariables($hookName, array $configuration)
    {

    }
}
