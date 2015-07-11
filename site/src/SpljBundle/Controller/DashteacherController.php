<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DashteacherController extends Controller
{

    /**
    * @Route(
    *   "/dashboard-teacher/list-qcm",
    *   name="splj.dashTeacher.list-qcm"
    * )
    *
    * @Template("SpljBundle:DashTeacher:list-qcm.html.twig")
    */
    public function listQcmAction()
    {
       $qcm = array(
         [
            'id' => '0',
            'sujet' => 'la procrastination',
            'theme' => 'branleur',
            'author' => 'titi',
            'statut' => 'publié'

        ]);

       return array(
        "qcm" => $qcm
        );
    }

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
