<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request as Request;
/**
 * @Route("/home")
 */

class WindowController extends Controller
{
	/**
    * @Route(
    * 	"",
    * 	name="splj.window.index"
    * )
    *
    * @Template("SpljBundle:Window:index.html.twig")
    */
    public function indexAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $em = $this->getDoctrine()->getManager();
        $src = $doctrine->getRepository('SpljBundle:Article');
        
        $article = $src->findAll();
       
        $ids = array_rand($article,3);

        $query = $em->createQueryBuilder();
        $query = $src->createQueryBuilder('a')
            ->where($query->expr()->in('a.id', $ids));
        $articleRandom = $query->getQuery()->getResult();

        return array(
            'article' => $article,
            'articleRandom' => $articleRandom
        );
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
    *   "/article/{id}",
    *   name="splj.window.article"
    * )
    *
    * @Template("SpljBundle:Window:article.html.twig")
    */
    public function articleAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('SpljBundle:Article')->find($id);

        return array(
            'article' => $article
        );
    }
}

