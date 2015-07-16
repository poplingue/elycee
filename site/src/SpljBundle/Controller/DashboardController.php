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
    *   "/list-qcm",
    *   name="splj.dashboard.list-qcm"
    * )
    *
    * @Template("SpljBundle:Dashboard:list-qcm.html.twig")
    */
    public function listQcmAction(Request $request)
    {
       $qcm = array(
         [
            'id' => '0',
            'sujet' => 'la procrastination',
            'theme' => 'branleur',
            'author' => 'titi',
            'status' => 'publié'

        ]);

        $entity = new Mcq();
        $type = new McqType();
        
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        
        return array(
            'form' => $form->createView(),
            'qcm' => $qcm
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
