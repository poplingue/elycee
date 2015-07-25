<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Doctrine\Common\Collections\ArrayCollection;

use SpljBundle\Entity\Mcq;
use SpljBundle\Entity\Question;
use SpljBundle\Entity\Answer;
use SpljBundle\Form\McqType;
use SpljBundle\Form\QuestionType;
use SpljBundle\Form\AnswerType;


use Symfony\Component\HttpFoundation\Request as Request;

/**
 * @Route ("/dashteacher")
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

            for ($j=0; $j < 3; $j++) {
                $answer = new Answer();
                $question->getAnswers()->add($answer);
            }
            
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
            return $this->redirect($this->generateUrl('splj.dashboard.list-mcq',array('id' => 2)));
        }

        return $this->render('SpljBundle:DashTeacher:form-question.html.twig', array(
            'form' => $form->createView(),
            'mcqCurrent' => $mcqCurrent
        ));
    }

    public function onSubmit($form,$question)
    {
        $em = $this->getDoctrine()->getManager();

        $em->persist($question);
        $em->flush();

        $answers = $question->getAnswers();
        for ($i=0; $i < sizeof($answers); $i++) {
            $answers->get($i)->setIdQuestion($question);
            $em->persist($answers->get($i));
            $em->flush();
        }
        
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
        $mcqCurrent = $this->loadMcq($id);
        $form = $this->createForm(new McqType(),$mcqCurrent, array(
            'action' => $this->generateUrl('splj.dashTeacher.update-mcq', array('id' => $id)),
        ));
        $questions = $mcqCurrent->getNbQuestions();
        $form->handleRequest($request);
        
        if($form->isSubmitted()){
            for ($i=0; $i < sizeof($questions); $i++){
                $this->onSubmit($form,$mcqCurrent->getQuestions()->get($i));
            }
            return $this->redirect($this->generateUrl('splj.dashboard.list-mcq',array('id' => 1)));
        }
        return $this->render('SpljBundle:DashTeacher:form-question.html.twig', array(
            'form' => $form->createView(),
            'mcqCurrent' => $mcqCurrent
        ));
    }

    public function loadMcq($id)
    {   
        $doctrine = $this->getDoctrine()->getManager();
        $src = $doctrine->getRepository('SpljBundle:Mcq');
        $mcqCurrent = $src->find($id);
        
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

        $arrayCollection = new ArrayCollection($questions);
        $mcqCurrent->setQuestions($arrayCollection);

        for ($i=0; $i < sizeof($questions); $i++) {

            $questionCurrent = $questions[$i]->getId();

            $qb = $this->getDoctrine()->getRepository('SpljBundle:Answer')->createQueryBuilder('a');
            $qb->select(array('a'))
                ->from('SpljBundle:Answer', 'answer')
                ->leftJoin(
                        'SpljBundle:Question',
                        'q',
                        'WITH',
                        'a.idQuestion = q.id')
                ->where('q =:id')
                ->setParameter('id', $questionCurrent);
            $query = $qb->getQuery();
            $answers = $query->getResult();

            $arrayCollection = new ArrayCollection($answers);
            $questions[$i]->setAnswers($arrayCollection);

        }
        return $mcqCurrent;
    }
}