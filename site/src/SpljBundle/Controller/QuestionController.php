<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Question;
use SpljBundle\Entity\Answer;
use SpljBundle\Form\QuestionType;
use SpljBundle\Form\AnswerType;
use Symfony\Component\HttpFoundation\Request as Request;

class QuestionController extends Controller
{
	/**
     * 
     * @Route (
     *      "/dashboard-teacher/add-question",
     *      name="splj.form.question"
     * )
     * 
     * @Template("SpljBundle:DashTeacher:form-question.html.twig")
     * 
     */
    public function addAction(Request $request)
    { 
        
        $entity = new Question();
        $type = new QuestionType();
        
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        
        return array(
            'form' => $form->createView()
        );
    }
}