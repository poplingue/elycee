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
     * 
     * @Route (
     *      "/dashboard-teacher/create-mcq",
     *      name="splj.form.mcq"
     * )
     * 
     * @Template("SpljBundle:DashTeacher:form-mcq.html.twig")
     * 
     */
    public function createAction(Request $request)
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