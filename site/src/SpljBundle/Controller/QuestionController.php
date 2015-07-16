<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Question;
use SpljBundle\Entity\Answer;
use SpljBundle\Form\QuestionType;

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

        $question = new Question();
        $answer1 = new Answer();
        $question->getAnswers();
        $form = $this->createForm(new QuestionType(), $question);
        
        // $form = $this->createForm($type,$question, array(
        //     'action' => $this->generateUrl('splj.dashTeacher.add-question'),
        //     'method' => 'POST',
        // ));
        $form->handleRequest($request);

        if($form->isSubmitted())
        {
            $answer->setAnswer('rrrr');
            $question->setIdQcm($id);
            $this->onSubmit($form,$question);
            return $this->redirect($this->generateUrl('splj.dashboard.list-mcq'));
        }

        return $this->render('SpljBundle:DashTeacher:form-question.html.twig', array(
            'form' => $form->createView()
        ));
    }

    public function onSubmit($form,$question)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($question);
        $em->flush();
    }
}