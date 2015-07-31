<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request as Request;

use SpljBundle\Entity\Contact;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

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
        $em = $doctrine->getManager();
        $src = $doctrine->getRepository('SpljBundle:Article');
        
        $qb = $src->createQueryBuilder('a');
        $qb->select(array('a'))
            ->orderBy('a.date', 'DESC');
        $query = $qb->getQuery();
        $article = $query->getResult();
       
        // username list
        $query = $em->createQuery('SELECT a.id, u.username FROM SpljBundle:Article a, SpljBundle:User u WHERE a.userId = u.id ORDER BY a.id ASC');
        $users = $query->getResult();

        for ($i=0; $i < sizeof($article); $i++) { 
            $arrayTmp = $users[$i];
            $article[$i]->setUsername($arrayTmp['username']);
        }

        return array(
            'article' => $article
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
    * 	name="splj.window.contact"
    * )
    *
    * @Template("SpljBundle:Window:contact.html.twig")
    */
    public function contact(Request $request)
    {

        if (!isset($_POST['random1'])) {
            $random1 = rand(0,10);
            $random2 = rand(0,10);
         
            return array(
                'random1' => $random1,
                'random2' => $random2
            );
        }

        $data = $request->request->all();
        return new JsonResponse($data);
    }

    /**
    * @Route(
    *   "/contact-save",
    *   name="splj.window.contact-save",
    *   options={"expose"=true}
    * )
    *
    */
    public function contactSaveAction(Request $request)
    {

        $random1 = $_POST['random1'];
        $random2 = $_POST['random2'];
        
        if ($request->isXmlHttpRequest()){
            $data = $request->request->all();
            $randSum = $random1 + $random2;
            
            if ($data['random'] == $randSum && $data['email'] != null && $data['name'] != null && $data['message'] != null) {
            
                $contact = new Contact();
                $contact->setEmail($data['email']);
                $contact->setName($data['name']);
                $contact->setMessage($data['message']);

                $em = $this->getDoctrine()->getManager();
                $em->persist($contact);
                $em->flush();
                
                $message = \Swift_Message::newInstance()
                    ->setSubject('Splj a un message')
                    ->setFrom($data['email'])
                    ->setTo('p.gaudetchah@gmail.com')
                    ->setBody('Vous avez une message de la part de ['.$data['name'].' - '.$data['email'].'] : '.$data['message'])
                    ->setContentType('text/html');

                $this->get('mailer')->send($message);

                return new JsonResponse($data);
            }else{
                return new JsonResponse(array('message' => ''), 500);
            }
        }
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

