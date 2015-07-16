<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


/**
 * @Route("/home")
 */

class WindowController extends Controller
{
	/**
    * @Route(
    * 	"/",
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
    * 	"/login",
    * 	name="splj.window.login"
    * )
    *
    * @Template("SpljBundle:Window:login.html.twig")
    */
    public function loginAction()
    {
       return array();
    }

      /**
    * @Route(
    * 	"/estate",
    * 	name="splj.window.estate"
    * )
    *
    * @Template("SpljBundle:Window:estate.html.twig")
    */
    public function estateAction()
    {
       return array();
    }

      /**
    * @Route(
    * 	"/contact",
    * 	name="splj.window.contact"
    * )
    *
    * @Template("SpljBundle:Window:contact.html.twig")
    */
    public function statsAction()
    {
       return array();
    }

       /**
    * @Route(
    * 	"/titre",
    * 	name="splj.window.article"
    * )
    *
    * @Template("SpljBundle:Window:article.html.twig")
    */
    public function articleAction()
    {
       return array();
    }
}
