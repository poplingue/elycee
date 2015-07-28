<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request as Request;

use SpljBundle\Entity\Contact;

use Symfony\Component\HttpFoundation\JsonResponse;

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
       
        $ids = array_rand($article,1);

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
    * 	name="splj.window.contact",
    *   options={"expose"=true}
    * )
    *
    * @Template("SpljBundle:Window:contact.html.twig")
    */
    public function contact(Request $request)
    {
        if ($request->isXmlHttpRequest()){
            
            $data = $request->request->all();
            if ($data['email'] != 0 && $data['message']!= 0 && $data['name'] != 0) {
                $contact = new Contact();
                $contact->setEmail($data['email']);
                $contact->setName($data['name']);
                $contact->setMessage($data['message']);

                $em = $this->getDoctrine()->getManager();
                $em->persist($contact);
                $em->flush();

                return new JsonResponse(
                    array('output' => $data)
                );
            }
        }
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

