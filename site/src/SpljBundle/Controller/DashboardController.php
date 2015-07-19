<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Mcq;
use SpljBundle\Form\McqType;
use Symfony\Component\HttpFoundation\Request as Request;


/**
 * @Route("/dashboard")
 */

class DashboardController extends Controller
{

    /**
    * @Route(
    *   "/list-mcq/{id}",
    *   name="splj.dashboard.list-mcq",
    *  defaults={"id"=null}
    * )
    *
    * @Template("SpljBundle:Dashboard:list-mcq.html.twig")
    */
    public function listMcqAction(Request $request, $id)
    {
        $doctrine = $this->getDoctrine();
        
        /** On recupere les parametres de l'utilisateur **/
        $src = $doctrine->getRepository('SpljBundle:User');
        $user = $src->find($id);

        /** On recupere la liste des QCM **/
        $src = $doctrine->getRepository('SpljBundle:Mcq');
        $entity = new Mcq();
        $type = new McqType();
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        $mcq = $src->findAll();
        
        $scores = null;
        /** Si c'est un etudiant **/
        if($user->getProfil() == 2){
            /** On recupere la liste des scores de l etudiant **/
            $qb = $this->getDoctrine()->getRepository('SpljBundle:Score')->createQueryBuilder('s');
            $qb->select(array('s'))
                ->from('SpljBundle:Score', 'score')
                ->where('s.userId = :userId')
                ->setParameter('userId', $id);
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
