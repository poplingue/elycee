<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class WindowController extends Controller
{
	/**
    * @Route(
    * 	"/home",
    * 	name="splj.window.index"
    * )
    *
    * @Template("SpljBundle:Window:index.html.twig")
    */
    public function indexAction()
    {
       return array();
    }

    /**
    * @Route(
    * 	"/home/login",
    * 	name="splj.window.login"
    * )
    *
    * @Template("SpljBundle:Window:login.html.twig")
    */
    public function loginAction()
    {
       return array();
    }
}
