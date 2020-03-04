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

}
