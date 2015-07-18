<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Question;
use SpljBundle\Entity\Mcq;
use SpljBundle\Entity\Answer;
use SpljBundle\Form\QuestionType;
use SpljBundle\Form\McqType;


use Symfony\Component\HttpFoundation\Request as Request;

/**
 * @Route ("/dashboard-teacher")
 *
 */

class QuestionController extends Controller
{
	/**
     * 
     * @Route (
     *      "/add-question/{id}",
     *      name="splj.dashTeacher.add-question",
     *      defaults={"id"=null},
     * )
     * 
     * @Template("SpljBundle:DashTeacher:form-question.html.twig")
     * 
     */
    public function addAction(Request $request, $id)
    {

        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        $src = $doctrine->getRepository('SpljBundle:Mcq');

        $mcqCurrent = $src->find($id);
        $nbQuestion = $mcqCurrent->getNbQuestions();

        $mcq = new Mcq();
        
        for ($i=0; $i < $nbQuestion; $i++){
            $question = new Question();
            $question->setIdQcm($mcqCurrent);
            $mcq->getQuestions()->add($question);
        }

        $form = $this->createForm(new McqType(), $mcq, array(
            'action' => $this->generateUrl('splj.dashTeacher.add-question'),
            'method' => 'POST'
        ));
        $form->handleRequest($request);

        if($form->isSubmitted())
        {
            for ($i=0; $i < $nbQuestion; $i++){
                $this->onSubmit($form,$mcq->getQuestions()->get($i));
            }
            return $this->redirect($this->generateUrl('splj.dashboard.list-mcq'));
        }

        return $this->render('SpljBundle:DashTeacher:form-question.html.twig', array(
            'nbQuestion' => $nbQuestion,
            'form' => $form->createView()
        ));
    }

    public function onSubmit($form,$question)
    {
        $em = $this->getDoctrine()->getManager();

        $answer1 = $question->getAnswer1();

        $em->persist($question);
        $em->flush();
        
        $answer1->setIdQuestion($question->getId());
        $em->persist($answer1);
        $em->flush();
        
    }
}