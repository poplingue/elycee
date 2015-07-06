<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DashteacherController extends Controller
{
	/**
    * @Route(
    * 	"/dashboard-teacher",
    * 	name="splj.dashTeacher.index"
    * )
    *
    * @Template("SpljBundle:DashTeacher:index.html.twig")
    */
    public function indexAction()
    {
       return array();
    }
}
