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

      /**
    * @Route(
    * 	"/home/etablissement",
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
    * 	"/home/statistiques",
    * 	name="splj.window.stats"
    * )
    *
    * @Template("SpljBundle:Window:stats.html.twig")
    */
    public function statsAction()
    {
       return array();
    }

       /**
    * @Route(
    * 	"/home/titre",
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
