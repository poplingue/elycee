<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request as Request;

use SpljBundle\Entity\Contact;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
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
        $query = $em->createQuery('SELECT a.id, u.username FROM SpljBundle:Article a, UserBundle:User u WHERE a.userId = u.id ORDER BY a.id ASC');
        $users = $query->getResult();

        for ($i=0; $i < sizeof($article); $i++) { 
            $arrayTmp = $users[$i];
            $article[$i]->setUsername($arrayTmp['username']);
        }
        
        $this->articlesInSession($request);
        return array(
            'articles' => $article
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
    public function estateAction(Request $request)
    {
        $this->articlesInSession($request);
        return array();
    }

     /**
    * @Route(
    *   "/legal",
    *   name="splj.window.legal"
    * )
    *
    * @Template("SpljBundle:Window:legal.html.twig")
    */
    public function legalAction(Request $request)
    {
        $this->articlesInSession($request);
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

        // nb random secu
        if (!isset($_POST['random1'])) {
            $random1 = rand(0,10);
            $random2 = rand(0,10);
         
            return array(
                'random1' => $random1,
                'random2' => $random2
            );
        }
        
        $this->articlesInSession($request);

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
    *   "/search",
    *   name="splj.window.search"
    * )
    *
    * @Template("SpljBundle:Window:search.html.twig")
    */
    public function searchAction(Request $request)
    {
        $this->articlesInSession($request);
        return array();
    }

    /**
    * @Route(
    *   "/go-search",
    *   name="splj.window.go-search",
    *   options={"expose"=true}
    * )
    *
    */
    public function goSearchAction(Request $request)
    {

        $data = $request->request->all();
        if ($data['search'] != null && $request->isXmlHttpRequest()){

            if(strpos($data['search'], " ") !== false){
                $search = str_replace(" ", "%", $data['search']);
            }else{
                $search = $data['search'];
            }

            $doctrine = $this->getDoctrine();
            $qb = $doctrine->getRepository('SpljBundle:Article')->createQueryBuilder('a');
            $qb ->select('a')
                ->where($qb->expr()->like('a.content',':word'))
                ->orWhere($qb->expr()->like('a.title',':word'))
                ->setParameter('word','%' .$search. '%')
                ->orderBy('a.date', 'DESC');
            
            $query = $qb->getQuery();
            $article = $query->getResult();

            // affichage date
            for ($i=0; $i < sizeOf($article); $i++) {
                $newDate = $article[$i]->getDate()->format('d-m-Y');
                $article[$i]->setDate($newDate);
            }

            return new JsonResponse($article);

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
        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        $theArticle = $em->getRepository('SpljBundle:Article')->find($id);
         
        $this->articlesInSession($request);

        return array(
            'theArticle' => $theArticle
        );
    }

    public function articlesInSession(Request $request)
    {
        if (!$request->getSession()->has('articles')) {
            $doctrine = $this->getDoctrine();
            $article = $doctrine->getRepository('SpljBundle:Article')->findAll();
            $request->getSession()->set('articles', $article);
        }
        return;
    }
}

