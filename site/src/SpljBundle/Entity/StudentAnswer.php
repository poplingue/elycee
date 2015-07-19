<?php

namespace SpljBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

use Doctrine\ORM\Mapping as ORM;

/**
 * Answer
 */
class StudentAnswer
{
    /**
     * @var boolean
     */
    private $answer1;

  	 /**
     * @var boolean
     */
    private $answer2;

     /**
     * @var boolean
     */
    private $answer3;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getAnswer1()
    {
        return $this->answer1;
    }

    /**
     * Set answer
     *
     * @param string $answer1
     * @return StudentAnswer
     */
    public function setAnswer1($answer1)
    {
        $this->answer1 = $answer1;

        return $this;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getAnswer2()
    {
        return $this->answer2;
    }

    /**
     * Set answer
     *
     * @param string $answer2
     * @return StudentAnswer
     */
    public function setAnswer2($answer2)
    {
        $this->answer2 = $answer2;

        return $this;
    }
    
        /**
     * Get id
     *
     * @return integer 
     */
    public function getAnswer3()
    {
        return $this->answer3;
    }

    /**
     * Set answer
     *
     * @param string $answer3
     * @return StudentAnswer
     */
    public function setAnswer3($answer3)
    {
        $this->answer3 = $answer3;

        return $this;
    }
}
