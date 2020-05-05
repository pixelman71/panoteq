<?php

class PanoteqConfiguration extends ObjectModel
{
//    public $id_panoteq_conf;
    public $contents;
    public $associated_products;
    public $comment;
    public $active;

    /**
     * @see ObjectModel::$definition
     */
    public static $definition = [
        'table' => 'panoteq_configuration',
        'primary' => 'id_panoteq_configuration',
        'fields' => array(
//            'id_panoteq_conf' => array('id_panoteq_conf' => self::TYPE_INT, 'validate' => 'isUnsignedInt', 'required' => true),
            'contents' => array('type' => self::TYPE_STRING, 'required' => true, 'size' => 65535),
            'associated_products' => array('type' => self::TYPE_STRING, 'required' => true, 'size' => 100),
            'comment' => array('type' => self::TYPE_STRING, 'required' => true, 'size' => 200),
            'active' => array('type' => self::TYPE_BOOL, 'required' => false),
//            'created' => array('created' => self::TYPE_DATE),
//                    'description' => array('type' => self::TYPE_HTML, 'lang' => false, 'validate' => 'isString', 'size' => 3999999999999),
//                    'image' => array('type' => self::TYPE_STRING, 'lang' => false, 'validate' => 'isString', 'required' => false, 'size' => 3999999999),
//                    'link' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => false, 'size' => 265),
//                    'porder' =>           array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt', 'required' => false),
        ),
    ];
}
