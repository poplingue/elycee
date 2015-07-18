<?php

namespace SpljBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

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
     * @var integer
     */
    private $userId;

    /**
     * @var integer
     */
    private $nbQuestions;

    /**
     * @var integer
     */
    private $status;

    /**
    * Liste des questions du MCQ
    * @var ArrayCollection $questions
    * @ORM\OneToMany(targetEntity="Question", mappedBy="idQcm", cascade={"all"})
    */
    protected $questions;

    /**
     * Surcharge du constructeur
     */
    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }


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
     * Set userId
     *
     * @param integer $userId
     * @return Article
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
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

    /**
     * Set status
     *
     * @param integer $status
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
     * @return integer 
     */
    public function getStatus()
    {
        return $this->status;
    }

    public function getQuestions()
    {
        return $this->questions;
    }

    public function setQuestions(ArrayCollection $questions)
    {
        $this->questions = $questions;
    }

    
    public function __toString()
    {
      return strval( $this->getId() );
    }
}
