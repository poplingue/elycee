<?php

namespace SpljBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('SpljBundle:Default:index.html.twig', array('name' => $name));
    }
}
