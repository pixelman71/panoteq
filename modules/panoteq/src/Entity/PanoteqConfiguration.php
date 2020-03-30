<?php

namespace Panoteq\Configurator\Entity;

use PrestaShop\PrestaShop\Adapter\Entity\ObjectModel;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table()
 * @ORM\Entity()
 */
class PanoteqConfiguration extends ObjectModel
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(name="id_panoteq_configuration", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id_panoteq_configuration;

    /**
     * @var string
     *
     * @ORM\Column(name="contents", type="text")
     */
    public $contents;

    /**
     * @var bool
     *
     * @ORM\Column(name="active", type="boolean")
     */
    public $active;

    /**
     * @var string
     *
     * @ORM\Column(name="associated_products", type="text")
     */
    public $associatedProducts;


    /**
     * @return string
     */
    public function getContents()
    {
        return $this->contents;
    }

    /**
     * @param string $contents
     *
     * @return PanoteqConfiguration
     */
    public function setContents($contents)
    {
        $this->contents = $contents;

        return $this;
    }

    /**
     * @return bool
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * @param string $active
     *
     * @return PanoteqConfiguration
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }


    /**
     * @return string
     */
    public function getAssociatedProducts()
    {
        return $this->associatedProducts;
    }

    /**
     * @param string $associatedProducts
     *
     * @return PanoteqConfiguration
     */
    public function setAssociatedProducts($associatedProducts)
    {
        $this->associatedProducts = $associatedProducts;

        return $this;
    }

}
