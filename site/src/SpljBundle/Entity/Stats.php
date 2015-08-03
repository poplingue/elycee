<?php

namespace SpljBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Stats
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Stats
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="totalArticle", type="integer")
     */
    private $totalArticle;

    /**
     * @var integer
     *
     * @ORM\Column(name="totalMcq", type="integer")
     */
    private $totalMcq;

    /**
     * @var integer
     *
     * @ORM\Column(name="totalQuestion", type="integer")
     */
    private $totalQuestion;

    /**
     * @var integer
     *
     * @ORM\Column(name="totalStudent", type="integer")
     */
    private $totalStudent;

     /**
     * @var integer
     *
     * @ORM\Column(name="totalTeacher", type="integer")
     */
    private $totalTeacher;

    /**
     * @var array
     *
     * @ORM\Column(name="teacherArray", type="array")
     */
    private $teacherArray;

    /**
     * @var array
     *
     * @ORM\Column(name="studentArray", type="array")
     */
    private $studentArray;

    /**
     * @var integer
     *
     * @ORM\Column(name="pasArticle", type="integer")
     */
    private $pasArticle;

    /**
     * @var integer
     *
     * @ORM\Column(name="pasMcq", type="integer")
     */
    private $pasMcq;

    /**
     * @var integer
     *
     * @ORM\Column(name="pasQuestion", type="integer")
     */
    private $pasQuestion;

    /**
     * @var integer
     *
     * @ORM\Column(name="pasMcqStudent", type="integer")
     */
    private $pasMcqStudent;

    /**
     * @var integer
     *
     * @ORM\Column(name="pasScore", type="integer")
     */
    private $pasScore;


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
     * Set totalArticle
     *
     * @param integer $totalArticle
     * @return Stats
     */
    public function setTotalArticle($totalArticle)
    {
        $this->totalArticle = $totalArticle;

        return $this;
    }

    /**
     * Get totalArticle
     *
     * @return integer 
     */
    public function getTotalArticle()
    {
        return $this->totalArticle;
    }

    /**
     * Set totalMcq
     *
     * @param integer $totalMcq
     * @return Stats
     */
    public function setTotalMcq($totalMcq)
    {
        $this->totalMcq = $totalMcq;

        return $this;
    }

    /**
     * Get totalMcq
     *
     * @return integer 
     */
    public function getTotalMcq()
    {
        return $this->totalMcq;
    }

    /**
     * Set totalQuestion
     *
     * @param integer $totalQuestion
     * @return Stats
     */
    public function setTotalQuestion($totalQuestion)
    {
        $this->totalQuestion = $totalQuestion;

        return $this;
    }

    /**
     * Get totalQuestion
     *
     * @return integer 
     */
    public function getTotalQuestion()
    {
        return $this->totalQuestion;
    }

    /**
     * Set totalStudent
     *
     * @param integer $totalStudent
     * @return Stats
     */
    public function setTotalStudent($totalStudent)
    {
        $this->totalStudent = $totalStudent;

        return $this;
    }

    /**
     * Get totalStudent
     *
     * @return integer 
     */
    public function getTotalStudent()
    {
        return $this->totalStudent;
    }

     /**
     * Set totalteacher
     *
     * @param integer $totalteacher
     * @return Stats
     */
    public function setTotalTeacher($totalteacher)
    {
        $this->totalteacher = $totalteacher;

        return $this;
    }

    /**
     * Get totalteacher
     *
     * @return integer 
     */
    public function getTotalTeacher()
    {
        return $this->totalteacher;
    }

    /**
     * Set teacherArray
     *
     * @param array $teacherArray
     * @return Stats
     */
    public function setTeacherArray($teacherArray)
    {
        $this->teacherArray = $teacherArray;

        return $this;
    }

    /**
     * Get teacherArray
     *
     * @return array 
     */
    public function getTeacherArray()
    {
        return $this->teacherArray;
    }

    /**
     * Set studentArray
     *
     * @param array $studentArray
     * @return Stats
     */
    public function setStudentArray($studentArray)
    {
        $this->studentArray = $studentArray;

        return $this;
    }

    /**
     * Get studentArray
     *
     * @return array 
     */
    public function getStudentArray()
    {
        return $this->studentArray;
    }

    /**
     * Set pasArticle
     *
     * @param integer $pasArticle
     * @return Stats
     */
    public function setPasArticle($pasArticle)
    {
        $this->pasArticle = $pasArticle;

        return $this;
    }

    /**
     * Get pasArticle
     *
     * @return integer 
     */
    public function getPasArticle()
    {
        return $this->pasArticle;
    }

    /**
     * Set pasMcq
     *
     * @param integer $pasMcq
     * @return Stats
     */
    public function setPasMcq($pasMcq)
    {
        $this->pasMcq = $pasMcq;

        return $this;
    }

    /**
     * Get pasMcq
     *
     * @return integer 
     */
    public function getPasMcq()
    {
        return $this->pasMcq;
    }

    /**
     * Set pasMcq
     *
     * @param integer $pasQuestion
     * @return Stats
     */
    public function setPasQuestion($pasQuestion)
    {
        $this->pasQuestion = $pasQuestion;

        return $this;
    }

    /**
     * Get pasQuestion
     *
     * @return integer 
     */
    public function getPasQuestion()
    {
        return $this->pasQuestion;
    }

    /**
     * Set pasMcq
     *
     * @param integer $pasMcqStudent
     * @return Stats
     */
    public function setPasMcqStudent($pasMcqStudent)
    {
        $this->pasMcqStudent = $pasMcqStudent;

        return $this;
    }

    /**
     * Get pasMcqStudent
     *
     * @return integer 
     */
    public function getPasMcqStudent()
    {
        return $this->pasMcqStudent;
    }

    /**
     * Set pasMcq
     *
     * @param integer $pasScore
     * @return Stats
     */
    public function setPasScore($pasScore)
    {
        $this->pasScore = $pasScore;

        return $this;
    }

    /**
     * Get pasScore
     *
     * @return integer 
     */
    public function getPasScore()
    {
        return $this->pasScore;
    }
}
