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
use PrestaShop\PrestaShop\Adapter\BestSales\BestSalesProductSearchProvider;
class Posbestsellers extends Module
{
	private $_html = '';
	private $_postErrors = array();
	private $templateFile;
	function __construct()
	{
		$this->name = 'posbestsellers';
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
		$this->templateFile = 'module:posbestsellers/posbestsellers.tpl';
		$this->displayName = ('Pos Bestseller products');
		$this->description = $this->l('Adds a block displaying your current bestseller products');
	}

	function install()
	{
		$this->_clearCache('*');
        Configuration::updateValue('POS_HOME_SELLER_NBR', 20);
        Configuration::updateValue('POS_HOME_SELLER_SPEED', 1000);
        Configuration::updateValue('POS_HOME_SELLER_NAV', true);
        Configuration::updateValue('POS_HOME_SELLER_PAGINATION', false);
        Configuration::updateValue('POS_HOME_SELLER_ITEMS', 1);
        Configuration::updateValue('POS_HOME_SELLER_ROWS', 4);
		
		if (!Configuration::updateValue('SELLER_PRODUCTS_NBR', 20) OR !parent::install() OR !$this->registerHook('displayBlockPosition2') OR !$this->registerHook('displayLeftColumnProduct')  OR !$this->registerHook('displayHeader'))
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
                    'POS_HOME_SELLER_ITEMS' => $config['POS_HOME_SELLER_ITEMS'],
                     'POS_HOME_SELLER_PAGINATION' =>$config['POS_HOME_SELLER_PAGINATION'],
                     'POS_HOME_SELLER_SPEED' => $config['POS_HOME_SELLER_SPEED'],
                     'POS_HOME_SELLER_NAV' => $config['POS_HOME_SELLER_NAV']
                 )
            );

		$this->context->controller->addJS($this->_path.'js/posbestsellers.js');
	}

	

	  public function getContent()
    {
		
        $output = '';
        $errors = array();
        if (Tools::isSubmit('submitHomeSELLER')) {
            $nbr = Tools::getValue('POS_HOME_SELLER_NBR');
            if (!Validate::isInt($nbr) || $nbr <= 0) {
                $errors[] = $this->l('The number of products is invalid. Please enter a positive number.');
            }

     

          
            if (isset($errors) && count($errors)) {
                $output = $this->displayError(implode('<br />', $errors));
            } else {
                Configuration::updateValue('POS_HOME_SELLER_NBR', (int) $nbr);
              
				Configuration::updateValue('POS_HOME_SELLER_ROWS', Tools::getValue('POS_HOME_SELLER_ROWS'));
				Configuration::updateValue('POS_HOME_SELLER_ITEMS', Tools::getValue('POS_HOME_SELLER_ITEMS'));
				Configuration::updateValue('POS_HOME_SELLER_NAV', Tools::getValue('POS_HOME_SELLER_NAV'));
				Configuration::updateValue('POS_HOME_SELLER_PAGINATION', Tools::getValue('POS_HOME_SELLER_PAGINATION'));
				Configuration::updateValue('POS_HOME_SELLER_SPEED', Tools::getValue('POS_HOME_SELLER_SPEED'));
                
                Tools::clearCache(Context::getContext()->smarty, $this->getTemplatePath('posbestsellers.tpl'));
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
                        'name' => 'POS_HOME_SELLER_NBR',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l('Set the number of products that you would like to display on homepage (default: 8).'),
                    ),
                	array(
                        'type' => 'text',
                        'label' => $this->l('Items display on slide'),
                        'name' => 'POS_HOME_SELLER_ITEMS',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l(''),
                    ),
					array(
                        'type' => 'text',
                        'label' => $this->l('Speed'),
                        'name' => 'POS_HOME_SELLER_SPEED',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l(''),
                    ),
					array(
                        'type' => 'text',
                        'label' => $this->l('Rows'),
                        'name' => 'POS_HOME_SELLER_ROWS',
                        'class' => 'fixed-width-xs',
                        'desc' => $this->l('Rows products display on this block'),
                    ),
					 array(
                        'type' => 'switch',
                        'label' => $this->l('Pagination'),
                        'name' => 'POS_HOME_SELLER_PAGINATION',
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
                        'name' => 'POS_HOME_SELLER_NAV',
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
        $helper->submit_action = 'submitHomeSELLER';
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
            'POS_HOME_SELLER_NBR' => Tools::getValue('POS_HOME_SELLER_NBR', (int) Configuration::get('POS_HOME_SELLER_NBR')),
            'POS_HOME_SELLER_NAV' => Tools::getValue('POS_HOME_SELLER_NAV', (bool) Configuration::get('POS_HOME_SELLER_NAV')),
            'POS_HOME_SELLER_PAGINATION' => Tools::getValue('POS_HOME_SELLER_PAGINATION', (bool) Configuration::get('POS_HOME_SELLER_PAGINATION')),
            'POS_HOME_SELLER_ITEMS' => Tools::getValue('POS_HOME_SELLER_ITEMS', (int) Configuration::get('POS_HOME_SELLER_ITEMS')),
            'POS_HOME_SELLER_SPEED' => Tools::getValue('POS_HOME_SELLER_SPEED', (int) Configuration::get('POS_HOME_SELLER_SPEED')),
            'POS_HOME_SELLER_ROWS' => Tools::getValue('POS_HOME_SELLER_ROWS', (int) Configuration::get('POS_HOME_SELLER_ROWS')),
        );
    }
	 protected function getBestSellers()
    {
        if (Configuration::get('PS_CATALOG_MODE')) {
            return false;
        }

        $searchProvider = new BestSalesProductSearchProvider(
            $this->context->getTranslator()
        );

        $context = new ProductSearchContext($this->context);

        $query = new ProductSearchQuery();

        $nProducts = (int) Configuration::get('POS_HOME_SELLER_NBR');

        $query
            ->setResultsPerPage($nProducts)
            ->setPage(1)
        ;

        $query->setSortOrder(SortOrder::random());

        $result = $searchProvider->runQuery(
            $context,
            $query
        );

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

        $products_for_template = [];

        foreach ($result->getProducts() as $rawProduct) {
            $products_for_template[] = $presenter->present(
                $presentationSettings,
                $assembler->assembleProduct($rawProduct),
                $this->context->language
            );
        }

        return $products_for_template;
    }
	


	function hookdisplayBlockPosition4($params)
	{
		global $smarty;
			if (!$this->isCached($this->templateFile, $this->getCacheId('posbestsellers'))) {
				$products = $this->getBestSellers($params);
				
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
			}
			return $this->fetch($this->templateFile, $this->getCacheId('posbestsellers'));
			//return $this->display(__FILE__, 'posbestsellers.tpl');
	}
	function hookdisplayLeftColumnProduct($params)
	{
		global $smarty;
			if (!$this->isCached($this->templateFile, $this->getCacheId('posbestsellers'))) {
				$products = $this->getBestSellers($params);
				
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
			}
			return $this->fetch($this->templateFile, $this->getCacheId('posbestsellers'));
			//return $this->display(__FILE__, 'posbestsellers.tpl');
	}
}

