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

    /**
    * @Route(
    *   "/dashboard-teacher/list-qcm",
    *   name="splj.dashTeacher.list-qcm"
    * )
    *
    * @Template("SpljBundle:DashTeacher:list-qcm.html.twig")
    */
    public function qcmAction()
    {
       return array();
    }

    /**
    * @Route(
    *   "/dashboard-teacher/list-article",
    *   name="splj.dashTeacher.list-article"
    * )
    *
    * @Template("SpljBundle:DashTeacher:list-article.html.twig")
    */
    public function articleAction()
    {
       return array();
    }
}
