<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;

use UserBundle\Entity\User;
use UserBundle\Form\UserType;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class ContribController extends Controller
{
   
	/**
    * @Route(
    *   "/home/contrib",
    *   name="user.security.login"
    * )
    *
    */
	public function addBddAction(Request $request)
	{
    	$doctrine =  $this->getDoctrine();;
		$src = $doctrine->getRepository('UserBundle:User');
        
        $user = $src->find(4);
		$user->setRoles(array('ROLE_TEACHER'));

		$this->getDoctrine()->getManager()->persist($user);

    	$this->getDoctrine()->getManager()->flush();
    }
}