<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use UserBundle\Entity\User;
use UserBundle\Form\UserType;

use Symfony\Component\HttpFoundation\Request as Request;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * @Route("/home")
 */
class UserController extends Controller
{
   

   

    /**
     * @Route("/logout", name="redirect.after.logout")
     */
    public function logoutAction(){}
}