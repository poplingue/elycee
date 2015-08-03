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
    /*$listNames = array('Alexandre', 'Marine', 'Anna');


    foreach ($listNames as $name) {

      // On crée l'utilisateur

      $user = new User;


      // Le nom d'utilisateur et le mot de passe sont identiques

      $user->setUsername($name);
      $user->setProfil(1);

      $user->setPassword($name);


      // On ne se sert pas du sel pour l'instant

      $user->setSalt('');

      // On définit uniquement le role ROLE_USER qui est le role de base

      $user->setRoles(array('ROLE_TEACHER'));


      // On le persiste

      $this->getDoctrine()->getManager()->persist($user);

    }


    // On déclenche l'enregistrement

    $this->getDoctrine()->getManager()->flush();*/

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