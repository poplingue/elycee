<?php

namespace SpljBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;

use Doctrine\ORM\Mapping as ORM;

/**
 * Question
 */
class Question
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $question;

    /**
     * @var integer
     */
    private $idQcm;

    /**
     * @Assert\Type(type="SpljBundle\Entity\Answers")
     */
    private $answers;


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
     * Set question
     *
     * @param string $question
     * @return Question
     */
    public function setQuestion($question)
    {
        $this->question = $question;

        return $this;
    }

    /**
     * Get question
     *
     * @return string 
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * Set idQcm
     *
     * @param integer $idQcm
     * @return Question
     */
    public function setIdQcm($idQcm)
    {
        $this->idQcm = $idQcm;

        return $this;
    }

    /**
     * Get idQcm
     *
     * @return integer 
     */
    public function getIdQcm()
    {
        return $this->idQcm;
    }

    //Methods answers
    public function getAnswers()
    {
        return $this->answers;
    }

    public function setAnswers(ArrayCollection $answers)
    {
        $this->answers = $answers;
    }
}
