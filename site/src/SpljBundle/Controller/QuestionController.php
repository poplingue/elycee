<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Question;
use SpljBundle\Entity\Mcq;
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
     *      defaults={"id"=null}
     * )
     * 
     * @Template("SpljBundle:DashTeacher:form-question.html.twig")
     * 
     */
    public function addAction(Request $request, $id)
    {

        $doctrine = $this->getDoctrine()->getManager();
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
            'form' => $form->createView(),
            'mcqCurrent' => $mcqCurrent
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

    /**
    * @Route(
    *   "/update-mcq/{id}",
    *   name="splj.dashTeacher.update-mcq"
    * )
    *
    * @Template("SpljBundle:DashTeacher:form-question.html.twig")
    * 
    */
    public function updateAction(Request $request, $id)
    {   
        $qb = $this->getDoctrine()->getRepository('SpljBundle:Question')->createQueryBuilder('q');
        $qb->select(array('q'))
            ->from('SpljBundle:Question', 'question')
            ->leftJoin(
                    'SpljBundle:Mcq',
                    'm',
                    'WITH',
                    'q.idQcm = m.id')
            ->where('m =:id')
            ->setParameter('id', $id);
        $query = $qb->getQuery();
        $questions = $query->getResult();
        var_dump($questions);

        for ($i=0; $i < sizeof($questions); $i++) { 
            $qb = $this->getDoctrine()->getRepository('SpljBundle:Answer')->createQueryBuilder('a');
            $qb->select(array('a'))
                ->from('SpljBundle:Answer', 'answer1')
                ->leftJoin(
                        'SpljBundle:Question',
                        'q',
                        'WITH',
                        'a.idQuestion = q.id')
                ->where('a =:id')
                ->setParameter('id', $i);
            $query = $qb->getQuery();
        }
        $answers = $query->getResult();
        var_dump($answers);




        $form = $this->createForm($type,$question, array(
            'action' => $this->generateUrl('splj.dashTeacher.update-mcq', array('id' => $id)),
        ));

        $form->handleRequest($request);
        
        if($form->isSubmitted()){
            $this->onSubmit($form,$mcqCurrent);
            return $this->redirect($this->generateUrl('splj.dashTeacher.list-mcq'));
        }
        return $this->render('SpljBundle:DashTeacher:form-question.html.twig', array(
            'form' => $form->createView(),
            'mcqCurrent' => $mcqCurrent
        ));
    }
}