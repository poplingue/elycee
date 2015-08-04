<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Mcq;
use UserBundle\Entity\User;
use SpljBundle\Form\McqType;

use Symfony\Component\HttpFoundation\Request as Request;
use Symfony\Component\Security\Http\Firewall\ExceptionListener;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * @Route("/dashboard")
 */

class DashboardController extends Controller
{

    /**
    * @Route(
    *   "/list-mcq",
    *   name="splj.dashboard.list-mcq"
    * )
    *
    */
    public function listMcqAction(Request $request)
    {
        $session = $request->getSession();
        $user = $session->get('user');

        // MCQ status 1 / 0
        $doctrine = $this->getDoctrine();
        $qb = $doctrine->getRepository('SpljBundle:Mcq')->createQueryBuilder('m');
        $qb->select(array('m'))
            ->where('m.status != 2');
        $query = $qb->getQuery();
        $mcq = $query->getResult(); 
        
        $entity = new Mcq();
        $type = new McqType();
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);

        // scores of students
        $scores = null;
        if($this->get('security.context')->isGranted('ROLE_STUDENT')){
            $qb = $this->getDoctrine()->getRepository('SpljBundle:Score')->createQueryBuilder('s');
            $qb->select(array('s'))
                ->where('s.userId = :userId')
                ->setParameter('userId', $user->getId());
            $query = $qb->getQuery();
            $scores = $query->getResult();
        }

        // username
        $em = $doctrine->getManager();
        $query = $em->createQuery('SELECT m.id, u.username FROM SpljBundle:Mcq m, UserBundle:User u WHERE m.userId = u.id AND m.status!= 2 ORDER BY m.id ASC');
        $users = $query->getResult();
        for ($i=0; $i < sizeof($mcq); $i++) { 
            $arrayTmp = $users[$i];
            $mcq[$i]->setUsername($arrayTmp['username']);
        }

        return $this->render('SpljBundle:Dashboard:list-mcq.html.twig', array(
            'user' => $user,
            'mcq' => $mcq,
            'scores' => $scores,
            'form' => $form->createView()
        ));
    }
}
