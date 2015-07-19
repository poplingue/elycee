<?php

namespace SpljBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

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
    * Liste des reponses a ma question
    * @var ArrayCollection $answers
    * @ORM\OneToMany(targetEntity="Answer", mappedBy="idQuestion", cascade={"all"})
    */
    protected $answers;

     /**
     * Surcharge du constructeur
     */
    public function __construct()
    {
        $this->answers = new ArrayCollection();
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

    public function getAnswers()
    {
        return $this->answers;
    }

    public function setAnswers(ArrayCollection $answers)
    {
        $this->answers = $answers;
    }

    public function __toString()
    {
      return strval( $this->getId() );
    }
}
