<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\Stats;

use Symfony\Component\HttpFoundation\Request as Request;

/*
 * @Route("/dashboard")
 */

class StatsController extends Controller
{
	/**
    * @Route(
    *   "/stats",
    *   name="splj.stats"
    * )
    *
    * @Template("SpljBundle:Dashboard:stats.html.twig")
    */
    public function statsAction(Request $request)
    {
    	$stats = new Stats();

    	$doctrine = $this->getDoctrine();
    	$em = $doctrine->getManager();
    	
    	// total articles
        $query = $em->createQuery('SELECT COUNT(a.id) FROM SpljBundle:Article a');
        $articleCount = $query->getSingleResult();
        $stats->setTotalArticle($articleCount[1]);

		// total qcm
        $query = $em->createQuery('SELECT COUNT(m.id) FROM SpljBundle:Mcq m WHERE m.status != 2');
        $mcqCount = $query->getSingleResult();
        $stats->setTotalMcq($mcqCount[1]);

        // total questions
        $query = $em->createQuery('SELECT COUNT(q.id) FROM SpljBundle:Question q, SpljBundle:Mcq m WHERE m.id = q.idQcm AND m.status != 2');
        $questionCount = $query->getSingleResult();
        $stats->setTotalQuestion($questionCount[1]);

        // total étudiants
        $query = $em->createQuery('SELECT COUNT(u.id) FROM SpljBundle:User u WHERE u.profil = 2');
        $studentCount = $query->getSingleResult();
        $stats->setTotalStudent($studentCount[1]);

        // total profs
        $query = $em->createQuery('SELECT COUNT(u.id) FROM SpljBundle:User u WHERE u.profil = 1');
        $teacherCount = $query->getSingleResult();
        $stats->setTotalTeacher($teacherCount[1]);

        // Tableau profs
        $query = $em->createQuery(
	        'SELECT u.username, 
				(SELECT count(m.id)
					FROM SpljBundle:Mcq m
					WHERE m.userId = u.id
					AND m.status != 2
					AND u.profil = 1
					GROUP BY u.username) AS mcqs, 
				(SELECT count(a.id)
					FROM SpljBundle:Article a
					WHERE a.userId = u.id
					AND a.status != 2
					AND u.profil = 1
					GROUP BY u.username) AS articles,
				(SELECT count(q.id)
					FROM SpljBundle:question q, SpljBundle:mcq x
					WHERE x.userId = u.id
					AND x.status != 2
					AND u.profil = 1
					AND x.id = q.idQcm
					GROUP BY u.username) AS questions 
			FROM SpljBundle:User u
			WHERE u.profil = 1');

        $teacherStats = $query->getResult();
        $stats->setTeacherArray($teacherStats);

        // tableau eleves
        $query = $em->createQuery(
        	'SELECT u.username,
        		(SELECT count(s.id)
	        		FROM SpljBundle:Score s
	        		WHERE s.userId = u.id
	        		AND u.profil = 2
	        		GROUP BY u.username) AS mcqs,
       			(SELECT SUM(c.score)
       				FROM SpljBundle:Score c
       				WHERE c.userId = u.id
	        		AND u.profil = 2
	        		GROUP BY u.username) AS score,
        		(SELECT SUM(x.scoreMax)
       				FROM SpljBundle:Score x
       				WHERE x.userId = u.id
	        		AND u.profil = 2
	        		GROUP BY u.username) AS scoreMax
        	FROM SpljBundle:User u
        	WHERE u.profil = 2');

        $studentStats = $query->getResult();
        $stats->setStudentArray($studentStats);

      	return array(
      		'stats' => $stats
      	);
    }
}