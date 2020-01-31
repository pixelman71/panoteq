<?php
if (!defined('_PS_VERSION_')) {
    exit;
}
use PrestaShop\PrestaShop\Core\Module\WidgetInterface;
use PrestaShop\PrestaShop\Adapter\Category\CategoryProductSearchProvider;
use PrestaShop\PrestaShop\Adapter\Image\ImageRetriever;
use PrestaShop\PrestaShop\Adapter\Product\PriceFormatter;
use PrestaShop\PrestaShop\Core\Product\ProductListingPresenter;
use PrestaShop\PrestaShop\Adapter\Product\ProductColorsRetriever;
use PrestaShop\PrestaShop\Adapter\Translator;
use PrestaShop\PrestaShop\Adapter\LegacyContext;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchContext;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchQuery;
use PrestaShop\PrestaShop\Core\Product\Search\SortOrder;
class Posnewproducts extends Module
{
	private $_html = '';
	private $_postErrors = array();

	function __construct()
	{
		$this->name = 'posnewproducts';
		$this->tab = 'Modules';
		$this->version = '1.0';
		$this->author = 'posthemes';
		$this->need_instance = 0;
        $this->ps_versions_compliancy = [
            'min' => '1.7',
            'max' => _PS_VERSION_,
        ];

        $this->bootstrap = true;
		
		parent::__construct();
		
		$this->displayName = ('Pos New products');
		$this->description = $this->l('Adds a block displaying your current new products');
	}

	function install()
	{
		$this->_clearCache('*');
        Configuration::updateValue('POS_HOME_NEW_NBR', 20);
        Configuration::updateValue('POS_HOME_NEW_SPEED', 1000);
        Configuration::updateValue('POS_HOME_NEW_NAV', true);
        Configuration::updateValue('POS_HOME_NEW_PAGINATION', false);
        Configuration::updateValue('POS_HOME_NEW_ITEMS', 4);
        Configuration::updateValue('POS_HOME_NEW_ROWS', 1);
		
		if (!Configuration::updateValue('NEW_PRODUCTS_NBR', 5) OR !parent::install() OR !$this->registerHook('displayBlockPosition1') OR !$this->registerHook('displayHeader'))
			return false;
		return true;
	}
	
	    public function uninstall()
    {
        $this->_clearCache('*');

        return parent::uninstall();
    }
	
	public function hookDisplayHeader()
	{ 
		     $config = $this->getConfigFieldsValues();
            Media::addJsDef(
                array(
                    'POS_HOME_NEW_ITEMS' => $config['POS_HOME_NEW_ITEMS'],
                     'POS_HOME_NEW_PAGINATION' =>$config['POS_HOME_NEW_PAGINATION'],
                     'POS_HOME_NEW_SPEED' => $config['POS_HOME_NEW_SPEED'],
                     'POS_HOME_NEW_NAV' => $config['POS_HOME_NEW_NAV']
                 )
            );
		$this->context->controller->addJS($this->_path.'js/posnewproducts.js');
	}

	

	  public function getContent()
    {
		
        $output = '';
        $errors = array();
        if (Tools::isSubmit('submitHomeNEW')) {
            $nbr = Tools::getValue('POS_HOME_NEW_NBR');
            if (!Validate::isInt($nbr) || $nbr <= 0) {
                $errors[] = $this->l('The number of products is invalid. Please enter a positive number.');
            }

     

          
            if (isset($errors) && count($errors)) {
                $output = $this->displayError(implode('<br />', $errors));
            } else {
                Configuration::updateValue('POS_HOME_NEW_NBR', (int) $nbr);
              
				Configuration::updateValue('POS_HOME_NEW_ROWS', Tools::getValue('POS_HOME_NEW_ROWS'));
				Configuration::updateValue('POS_HOME_NEW_ITEMS', Tools::getValue('POS_HOME_NEW_ITEMS'));
				Configuration::updateValue('POS_HOME_NEW_NAV', Tools::getValue('POS_HOME_NEW_NAV'));
				Configuration::updateValue('POS_HOME_NEW_PAGINATION', Tools::getValue('POS_HOME_NEW_PAGINATION'));
				Configuration::updateValue('POS_HOME_NEW_SPEED', Tools::getValue('POS_HOME_NEW_SPEED'));
                
                Tools::clearCache(Context::getContext()->smarty, $this->getTemplatePath('posnewproducts.tpl'));
                $output = $this->displayConfirmation($this->l('Your settings have been updated.'));
            }
        }

        return $output.$this->renderForm();
    }

	 public function renderForm()
    {
        $fields_form = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Settings'),
                    'icon' => 'icon-cogs',
                ),
                'description' => $this->l('To add products to your homepage, simply add them to the corresponding product category (default: "Home").'),
                'input' => array(
                    array(
                        'type' => 'text',
                        'label' => $this->l('Number of products to be displayed'),
                        'name' => 'POS_HOME_NEW_NBR',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l('Set the number of products that you would like to display on homepage (default: 8).'),
                    ),
                	array(
                        'type' => 'text',
                        'label' => $this->l('Items display on slide'),
                        'name' => 'POS_HOME_NEW_ITEMS',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l(''),
                    ),
					array(
                        'type' => 'text',
                        'label' => $this->l('Speed'),
                        'name' => 'POS_HOME_NEW_SPEED',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l(''),
                    ),
					array(
                        'type' => 'text',
                        'label' => $this->l('Rows'),
                        'name' => 'POS_HOME_NEW_ROWS',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l('Rows products display on this block'),
                    ),
					 array(
                        'type' => 'switch',
                        'label' => $this->l('Pagination'),
                        'name' => 'POS_HOME_NEW_PAGINATION',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l('Show Pagination'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Yes'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('No'),
                            ),
                        ),
                    ),
					 array(
                        'type' => 'switch',
                        'label' => $this->l('Next/Back'),
                        'name' => 'POS_HOME_NEW_NAV',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l('Show Next/Back'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Yes'),
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('No'),
                            ),
                        ),
                    ),
          
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $lang = new Language((int) Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
        $this->fields_form = array();
        $helper->id = (int) Tools::getValue('id_carrier');
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitHomeNEW';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false).'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($fields_form));
    }
	

    public function getConfigFieldsValues()
    {
        return array(
            'POS_HOME_NEW_NBR' => Tools::getValue('POS_HOME_NEW_NBR', (int) Configuration::get('POS_HOME_NEW_NBR')),
            'POS_HOME_NEW_NAV' => Tools::getValue('POS_HOME_NEW_NAV', (bool) Configuration::get('POS_HOME_NEW_NAV')),
            'POS_HOME_NEW_PAGINATION' => Tools::getValue('POS_HOME_NEW_PAGINATION', (bool) Configuration::get('POS_HOME_NEW_PAGINATION')),
            'POS_HOME_NEW_ITEMS' => Tools::getValue('POS_HOME_NEW_ITEMS', (int) Configuration::get('POS_HOME_NEW_ITEMS')),
            'POS_HOME_NEW_SPEED' => Tools::getValue('POS_HOME_NEW_SPEED', (int) Configuration::get('POS_HOME_NEW_SPEED')),
            'POS_HOME_NEW_ROWS' => Tools::getValue('POS_HOME_NEW_ROWS', (int) Configuration::get('POS_HOME_NEW_ROWS')),
        );
    }
	
	public function getProducts(){
		global $cookie;
		$assembler = new ProductAssembler($this->context);

		$presenterFactory = new ProductPresenterFactory($this->context);
		$presentationSettings = $presenterFactory->getPresentationSettings();
		$presenter = new ProductListingPresenter(
			new ImageRetriever(
				$this->context->link
			),
			$this->context->link,
			new PriceFormatter(),
			new ProductColorsRetriever(),
			 $this->context->getTranslator()
		);
		$nb = (int)Configuration::get('POS_HOME_NEW_NBR');
			
		$products = Product::getNewProducts((int) $this->context->language->id, 0, $nb);
		
		$products_for_template = [];			
		foreach($products as $rawProduct) {
			
				 $products_for_template[] = $presenter->present(
					$presentationSettings,
					$assembler->assembleProduct($rawProduct),
					$this->context->language
				);
		}
		return $products_for_template; 
		
	}
	
	function hookdisplayBlockPosition1($params)
	{
		global $smarty;
	
			
			$products = $this->getProducts();
			$smarty->assign(array(
				'allow_buy_when_out_of_stock' => Configuration::get('PS_ORDER_OUT_OF_STOCK', false),
				'max_quantity_to_allow_display' => Configuration::get('PS_LAST_QTIES'),
				'products' => $products,
				'currency' => new Currency(intval($params['cart']->id_currency)),
				'lang' => Language::getIsoById(intval($params['cookie']->id_lang)),
				'productNumber' => sizeof($products),
				'homeSize' => Image::getSize('home'),
				'config' => $this->getConfigFieldsValues()
			));
			return $this->display(__FILE__, 'posnewproducts.tpl');
	}
	

}
