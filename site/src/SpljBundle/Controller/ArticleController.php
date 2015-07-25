<?php

namespace SpljBundle\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use SpljBundle\Entity\Article;
use SpljBundle\Form\ArticleType;
use Symfony\Component\HttpFoundation\Request as Request;

use Doctrine\Common\Util\Debug as Debug;

/**
 * @Route("/dashteacher")
 */

class ArticleController extends Controller
{

    /**
    * @Route(
    *   "/list-article",
    *   name="splj.dashTeacher.list-article",
    * )
    *
    * @Template("SpljBundle:DashTeacher:list-article.html.twig")
    */
    public function listAction(Request $request)
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
    *   "/create-article",
    *   name="splj.dashTeacher.create-article",
    * )
    *
    * @Template("SpljBundle:DashTeacher:form-article.html.twig")
    * 
    */
    public function createAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        // $em = $doctrine->getManager();

        $entity = new Article();
        $type = new ArticleType();
            
        $form = $this->createForm($type,$entity, array(
            'action' => $this->generateUrl('splj.dashTeacher.create-article'),
            'method' => 'POST',
        ));
        $form->handleRequest($request);

        if($form->isSubmitted()){
            
            $this->onSubmit($form,$entity);
            return $this->redirect($this->generateUrl('splj.dashTeacher.list-article'));
        }
        return array(
            'form' => $form->createView()
        );
    }

    /**
    * @Route(
    *   "/update-article/{id}",
    *   name="splj.dashTeacher.update-article"
    * )
    *
    * @Template("SpljBundle:DashTeacher:form-article.html.twig")
    * 
    */
    public function updateAction(Request $request, $id)
    {
        $doctrine = $this->getDoctrine();
        $src = $doctrine->getRepository('SpljBundle:Article');
        
        $entity = $src->find($id);
        $type = new ArticleType();
        
        $form = $this->createForm($type,$entity, array(
            'action' => $this->generateUrl('splj.dashTeacher.update-article', array('id' => $id)),
        ));

        $form->handleRequest($request);
        
        if($form->isSubmitted()){
            $this->onSubmit($form,$entity);
            return $this->redirect($this->generateUrl('splj.dashTeacher.list-article'));
        }
        return array(
            'form' => $form->createView(),
            'entity' => $entity
        );
    }

    /**
    * @Route(
    *   "/update-status/{id}",
    *   name="splj.dashTeacher.update-status",
    * )
    * 
    */
    public function updateStatusArticle($id)
    {
        $newStatus = $_POST["status"];
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('SpljBundle:Article')->find($id);

        $article->setStatus($newStatus);
        $em->flush();

        return $this->redirect($this->generateUrl('splj.dashTeacher.list-article'));

    }

    public function onSubmit($form,$entity)
    {
        $em = $this->getDoctrine()->getManager();
        $entity->upload();
        $em->persist($entity);
        $em->flush();
    }

    /**
    * 
    * @Route (
    *      "/delete-article/{id}",
    *      name="splj.dashTeacher.delete-article"
    * )
    * 
    */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository('SpljBundle:Article')->find($id);
           
        $article->setStatus(2);
        $em->flush();
        
        return $this->redirect($this->generateUrl('splj.dashTeacher.list-article'));
    }
}
