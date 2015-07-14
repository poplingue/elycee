<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Question;
use SpljBundle\Form\QuestionType;
use Symfony\Component\HttpFoundation\Request as Request;

class StudentController extends Controller
{

    /**
    * @Route(
    *   "/dashStudent/question",
    *   name="splj.dashStudent.question"
    * )
    *
    * @Template("SpljBundle:DashStudent:question.html.twig")
    */
    public function QuestionAction(Request $request)
    {
    	$question = array(
        [
            'question1' => 'Qui est Bradley Manning ?',
        ]);

        $answer = array(
        [
            'answerA' => 'ton père',
            'answerB' => 'ta mère',
            'answerC' => 'un lanceur d\'alerte',
        ]);

        $entity = new Question();
        $type = new QuestionType();
        
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        
        return array(
            'form' => $form->createView(),
            'question' => $question,
            'answer' => $answer
        );
    }
}
