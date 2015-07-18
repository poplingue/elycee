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
     * @var Mcq $idQcm
     * @ORM\ManyToOne(targetEntity="Mcq", inversedBy="questions")
     * @ORM\JoinColumn(name="id_qcm", referencedColumnName="id")
     * */
    private $idQcm;

    /**
     * @Assert\Type(type="SpljBundle\Entity\Answer")
     */
    protected $answer1;
     /**
     * @Assert\Type(type="SpljBundle\Entity\Answer")
     */
    protected $answer2;
    /**
     * @Assert\Type(type="SpljBundle\Entity\Answer")
     */
    protected $answer3;

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
     * @param Mcq $idQcm
     * 
     */
    public function setIdQcm($idQcm)
    {
        $this->idQcm = $idQcm;

        return $this;
    }

    /**
     * Get idQcm
     * 
     * @return Mcq 
     */
    public function getIdQcm()
    {
        return $this->idQcm;
    }

    //Methods answer x3
    public function getAnswer1()
    {
        return $this->answer1;
    }

    public function setAnswer1(Answer $answer = null)
    {
        $this->answer1 = $answer;
    }
    //
    public function getAnswer2()
    {
        return $this->answer2;
    }

    public function setAnswer2(Answer $answer = null)
    {
        $this->answer2 = $answer;
    }
    public function getAnswer3()
    {
        return $this->answer3;
    }

    public function setAnswer3(Answer $answer = null)
    {
        $this->answer3 = $answer;
    }
}
