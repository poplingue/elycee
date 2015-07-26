<?php

namespace SpljBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Article
 *
 * @ORM\Entity
 * 
 */
class Article
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
     * @var integer
     */
    private $userId;

    /**
     * @var \DateTime
     * @Assert\NotBlank()
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    public $image;


    /**
     * @Assert\File(maxSize="6000000")
     */
    public $file;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $content;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $extract;

    /**
     * @var integer
     */
    private $status;

     /**
    * @var string
    */
    private $username;

    public function getAbsolutePath()
    {
        return null === $this->image ? null : $this->getUploadRootDir().'/'.$this->image;
    }

    public function getWebPath()
    {
        return null === $this->image ? null : $this->getUploadDir().'/'.$this->image;
    }

    protected function getUploadRootDir()
    {
        return __DIR__.'/../../../../site/web/bundles/splj/img'.$this->getUploadDir();
    }

    protected function getUploadDir()
    {
         return '/articles';
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
     * @return Article
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
     * Set date
     *
     * @param \DateTime $date
     * @return Article
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set image
     *
     * @param string $image
     * @return Article
     */
    public function setImage()
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string 
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set content
     *
     * @param string $content
     * @return Article
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string 
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set extract
     *
     * @param string $extract
     * @return Article
     */
    public function setExtract($extract)
    {
        $this->extract = $extract;

        return $this;
    }

    /**
     * Get extract
     *
     * @return string 
     */
    public function getExtract()
    {
        return $this->extract;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return Article
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
    
    // upload file
    public function upload()
    {
        if (null === $this->file) {
            return;
        }
        $this->file->move($this->getUploadRootDir(), $this->file->getClientOriginalName());
        $this->image = $this->file->getClientOriginalName();
        $this->file = null;
    }

}
