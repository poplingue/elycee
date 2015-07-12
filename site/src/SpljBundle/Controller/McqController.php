<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Mcq;
use SpljBundle\Form\McqType;
use Symfony\Component\HttpFoundation\Request as Request;

class McqController extends Controller
{

	/**
    * @Route(
    *   "/dashboard-teacher/list-qcm",
    *   name="splj.dashTeacher.list-qcm"
    * )
    *
    * @Template("SpljBundle:DashTeacher:list-qcm.html.twig")
    */
    public function listQcmAction()
    {
       $qcm = array(
         [
            'id' => '0',
            'sujet' => 'la procrastination',
            'theme' => 'branleur',
            'author' => 'titi',
            'statut' => 'publié'

        ]);

       return array(
        "qcm" => $qcm
        );
    }

	/**
     * 
     * @Route (
     *      "/dashboard-teacher/create-mcq",
     *      name="splj.form.mcq"
     * )
     * 
     * @Template("SpljBundle:DashTeacher:form-mcq.html.twig")
     * 
     */
    public function addAction(Request $request)
    { 
        
        $entity = new Mcq();
        $type = new McqType();
        
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        
        return array(
            'form' => $form->createView()
        );
    }
}