<?php

namespace SpljBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;

use Doctrine\ORM\Mapping as ORM;

/**
 * Score
 */
class Score
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $userId;

    /**
     * @var integer
     */
    private $mcqId;

    /**
     * @var integer
     */
    private $score;

    /**
     * @var integer
     */
    private $scoreMax;

    /**
     * 
     */
    protected $studentAnswers;

    /**
     * Surcharge du constructeur
     */
    public function __construct()
    {
        $this->studentAnswers = new ArrayCollection();
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
     * Set userId
     *
     * @param integer $userId
     * @return Score
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
     * Set mcqId
     *
     * @param integer $mcqId
     * @return Score
     */
    public function setMcqId($mcqId)
    {
        $this->mcqId = $mcqId;

        return $this;
    }

    /**
     * Get mcqId
     *
     * @return integer 
     */
    public function getMcqId()
    {
        return $this->mcqId;
    }

    /**
     * Set score
     *
     * @param integer $score
     * @return Score
     */
    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    /**
     * Get score
     *
     * @return integer 
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * Set scoreMax
     *
     * @param integer $scoreMax
     * @return Score
     */
    public function setScoreMax($scoreMax)
    {
        $this->scoreMax = $scoreMax;

        return $this;
    }

    /**
     * Get scoreMax
     *
     * @return integer 
     */
    public function getScoreMax()
    {
        return $this->scoreMax;
    }

     /**
     * Get studentAnswers
     */
    public function getStudentAnswers()
    {
        return $this->studentAnswers;
    }

    /**
     * Set studentAnswers
     */
    public function setStudentAnswers(ArrayCollection $studentAnswers)
    {
        $this->studentAnswers = $studentAnswers;
    }
    
    // public function __toString()
    // {
    //   return strval( $this->getStudentAnswers() );
    // }
}
