<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Article;
use SpljBundle\Form\ArticleType;
use Symfony\Component\HttpFoundation\Request as Request;

use Doctrine\Common\Util\Debug as Debug;

class ArticleController extends Controller
{

    /**
    * @Route(
    *   "/dashboard-teacher/list-article",
    *   name="splj.dashTeacher.list-article",
    * )
    *
    * )
    * @Template("SpljBundle:DashTeacher:list-article.html.twig")
    */
    public function listArticleAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $src = $doctrine->getRepository('SpljBundle:Article');
       
        $entity = new Article();
        $type = new ArticleType();
        
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        
        $article = $src->findAll();

        return array(
            'article' => $article,
            'form' => $form->createView()
        );
    }

    /**
    * @Route(
    *   "/dashboard-teacher/create-article",
    *   name="splj.dashTeacher.create-article"
    * )
    *
    * @Template("SpljBundle:DashTeacher:form-article.html.twig")
    * 
    */
    public function createArticleAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        $src = $doctrine->getRepository('SpljBundle:Article');

        $entity = new Article();
        $type = new ArticleType();
        
        $form = $this->createForm($type,$entity);
        $form->handleRequest($request);
        
        if($form->isSubmitted()){
            $em = $this->getDoctrine()->getManager();
            $entity->upload();
            $em->persist($entity);
            $em->flush();
        }

        return array(
            'form' => $form->createView()
        );
    }

    /**
    * @Route(
    *   "/dashboard-teacher/update-status-article/{id}",
    *   name="splj.dashTeacher.update-article"
    * )
    * 
    */
   public function updateStatusAction($id)
   {
        $newStatus = $_POST["status"];
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('SpljBundle:Article')->find($id);

        $article->setStatus($newStatus);
        $em->flush();

        return $this->redirect($this->generateUrl('splj.dashTeacher.list-article'));

   }
    
}
