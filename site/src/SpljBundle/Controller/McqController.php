<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Mcq;
use SpljBundle\Form\McqType;
use Symfony\Component\HttpFoundation\Request as Request;

/**
 * @Route("/dashteacher")
 */

class McqController extends Controller
{

	/**
     * 
     * @Route (
     *      "/create-mcq",
     *      name="splj.dashTeacher.create-mcq"
     * )
     * 
     * @Template("SpljBundle:DashTeacher:form-mcq.html.twig")
     * 
     */
    public function createAction(Request $request)
    { 
        
        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();

        $entity = new Mcq();
        $type = new McqType();
            
        $form = $this->createForm($type,$entity, array(
            'action' => $this->generateUrl('splj.dashTeacher.create-mcq'),
            'method' => 'POST'
        ));
        $form->handleRequest($request);

        if($form->isSubmitted()){
            $this->onSubmit($form,$entity);
            return $this->redirect('/dashteacher/add-question/'.$entity->getId());
        }
        return array(
            'form' => $form->createView()
        );
    }

    /**
    * @Route(
    *   "/update-status-mcq/{id}",
    *   name="splj.dashTeacher.update-status-mcq",
    * )
    * 
    */
    public function updateStatusMcq($id)
    {
        $newStatus = $_POST["status"];
        $em = $this->getDoctrine()->getManager();
        $mcq = $em->getRepository('SpljBundle:Mcq')->find($id);

        $mcq->setStatus($newStatus);
        $em->flush();

        return $this->redirect($this->generateUrl('splj.dashboard.list-mcq', array('id'=>1)));

    }

    public function onSubmit($form,$entity)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($entity);
        $em->flush();
    }

     /**
    * 
    * @Route (
    *      "/delete-mcq/{id}",
    *      name="splj.dashTeacher.delete-mcq"
    * )
    * 
    */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $mcq = $em->getRepository('SpljBundle:Mcq')->find($id);
           
        $mcq->setStatus(2);
        $em->flush();
        
        return $this->redirect($this->generateUrl('splj.dashboard.list-mcq'));
    }
}