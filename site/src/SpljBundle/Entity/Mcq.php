<?php

namespace SpljBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;
use SpljBundle\Validator\Constraints as AssertSplj;
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
     * @Assert\NotBlank()
     */
    private $title;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $theme;

    /**
     * @var integer 
     */
    private $userId;

    /**
     * @var integer
     * @Assert\NotBlank()
     */
    private $nbQuestions;

    /**
     * @var integer
     */
    private $status;

    /**
    * @var string
    */
    private $username;

    /**
    * Liste des questions du MCQ
    * @var ArrayCollection $questions
    * @ORM\OneToMany(targetEntity="Question", mappedBy="idQcm", cascade={"all"})
    * 
    * 
    */
    protected $questions;

    /**
     * Surcharge du constructeur
     */
    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }
    /*------------------------------------*\
        #getter setter
    \*------------------------------------*/
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
        if($title !== null){
            $this->title = $title;
        }

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
        if($theme !== null){
            $this->theme = $theme;
        }

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
        if($userId !== null){
            $this->userId = $userId;
        }

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
        if($nbQuestions !== null){
            $this->nbQuestions = $nbQuestions;
        }

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
        if($status !== null){
            $this->status = $status;
        }

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

    /**
     * Get questions
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Set questions
     */
    public function setQuestions(ArrayCollection $questions)
    {
        $this->questions = $questions;
    }
    
    public function __toString()
    {
      return strval( $this->getId() );
    }

    /**
     * Get username
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }
}
