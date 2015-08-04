<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;

use UserBundle\Entity\User;
use UserBundle\Form\UserType;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class SecurityController extends Controller
{
   
	/**
    * @Route(
    *   "/home/login",
    *   name="user.security.login"
    * )
    *
    * @Template("UserBundle:Security:login.html.twig")
    */
	public function loginAction(Request $request)
	{

        $doctrine = $this->getDoctrine();
        $article = $doctrine->getRepository('SpljBundle:Article')->findAll();

        if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_REMEMBERED')){
            return $this->redirect($this->generateUrl('splj.dashboard.list-mcq'));
        }

        $entity = new User();
        $type = new UserType();
            
        $form = $this->createForm($type,$entity, array(
            'action' => $this->generateUrl('login_check'),
            'method' => 'POST',
        ));
        $form->handleRequest($request);

        $authenticationUtils = $this->get('security.authentication_utils');

        return array(
            'form' => $form->createView(),
            'error'=> $authenticationUtils->getLastAuthenticationError(),
            'articles' => $article
        );
	}

    /**
     * @Route("/home/logout", name="redirect.after.logout")
     */
    public function logoutAction(){}
}