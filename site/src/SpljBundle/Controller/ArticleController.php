<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ArticleController extends Controller
{

    /**
    * @Route(
    *   "/dashboard-teacher/list-article",
    *   name="splj.dashTeacher.list-article"
    * )
    *
    * @Template("SpljBundle:DashTeacher:list-article.html.twig")
    */
    public function listArticleAction()
    {
       $article = array(
         [
            'id' => '0',
            'title' => 'lorem rem',
            'author' => 'branleur',
            'date' => '27/06/2015',
            'statut' => 'publié'

        ]);

       return array(
        "article" => $article
        );
    }
}
