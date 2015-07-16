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
    *   "/list-mcq",
    *   name="splj.dashboard.list-mcq"
    * )
    *
    * @Template("SpljBundle:Dashboard:list-mcq.html.twig")
    */
    public function listMcqAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $src = $doctrine->getRepository('SpljBundle:Mcq');

        $entity = new Mcq();
        $type = new McqType();
        
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);

        $mcq = $src->findAll();
        return array(
            'mcq' => $mcq,
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
