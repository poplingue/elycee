<?php

namespace SpljBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Mcq
 */
class Mcq
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $theme;

    /**
     * @var boolean
     */
    private $status;

    /**
     * @var integer
     */
    private $nbQuestions;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Mcq
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set theme
     *
     * @param string $theme
     * @return Mcq
     */
    public function setTheme($theme)
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * Get theme
     *
     * @return string 
     */
    public function getTheme()
    {
        return $this->theme;
    }

    /**
     * Set status
     *
     * @param boolean $status
     * @return Mcq
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return boolean 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set nbQuestions
     *
     * @param integer $nbQuestions
     * @return Mcq
     */
    public function setNbQuestions($nbQuestions)
    {
        $this->nbQuestions = $nbQuestions;

        return $this;
    }

    /**
     * Get nbQuestions
     *
     * @return integer 
     */
    public function getNbQuestions()
    {
        return $this->nbQuestions;
    }
}
