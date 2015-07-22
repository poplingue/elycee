<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\User;
use SpljBundle\Form\UserType;

use Symfony\Component\HttpFoundation\Request as Request;
use Symfony\Component\HttpFoundation\Session\Session;
/**
 * @Route("/home")
 */

class UserController extends Controller
{
	/**
    * @Route(
    * 	"/login",
    * 	name="splj.window.login"
    * )
    *
    * @Template("SpljBundle:Window:login.html.twig")
    */
    public function loginAction(Request $request)
    {
    	$doctrine = $this->getDoctrine();
        // $em = $doctrine->getManager();

        $entity = new User();
        $type = new UserType();
            
        $form = $this->createForm($type,$entity, array(
            'action' => $this->generateUrl('login_check'),
            'method' => 'POST',
        ));
        $form->handleRequest($request);

        $authenticationUtils = $this->get('security.authentication_utils');
	    $error = $authenticationUtils->getLastAuthenticationError();

        return array(
            'form' => $form->createView(),
            'error'=> $error
        );
    }

    /**
     * @Route("/login_check", name="login_check")
     */
    public function loginCheckAction()
    {
    	$form->bind($request->getParameter($form->getUserame()));
    	print_r($form);
        // this controller will not be executed,
        // as the route is handled by the Security system
    }
}