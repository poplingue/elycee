<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Mcq;
use SpljBundle\Entity\User;
use SpljBundle\Form\McqType;

use Symfony\Component\HttpFoundation\Request as Request;
use Symfony\Component\Security\Http\Firewall\ExceptionListener;
use Symfony\Component\HttpFoundation\Session\Session;

/*
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
    * @Template("SpljBundle:Dashboard:list-mcq.html.twig")
    */
    public function listMcqAction(Request $request)
    {
        $session = $request->getSession();
        $user = $session->get('user');

        $doctrine = $this->getDoctrine();
        
        $src = $doctrine->getRepository('SpljBundle:Mcq');
        $entity = new Mcq();
        $type = new McqType();
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        $mcq = $src->findAll();
        
        $scores = null;
        if($user->getProfil() == 2){
            $qb = $this->getDoctrine()->getRepository('SpljBundle:Score')->createQueryBuilder('s');
            $qb->select(array('s'))
                ->from('SpljBundle:Score', 'score')
                ->where('s.userId = :userId')
                ->setParameter('userId', $user->getId());
            $query = $qb->getQuery();
            $scores = $query->getResult();
        }


        return array(
            'user' => $user,
            'mcq' => $mcq,
            'scores' => $scores,
            'form' => $form->createView()
        );
    }

    /**
    * @Route(
    *   "/stats",
    *   name="splj.stats"
    * )
    *
    * @Template("SpljBundle:Dashboard:stats.html.twig")
    */
    public function statsAction(Request $request)
    {
       return array();
    }
}
