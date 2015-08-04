<?php

namespace StatsBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use StatsBundle\Entity\Stats;

use Symfony\Component\HttpFoundation\Request as Request;
use Doctrine\ORM\EntityRepository;
use UserBundle\Entity\User;

/**
 * @Route("/dashboard")
 */

class DefaultController extends Controller
{
	/**
    * @Route(
    *   "/stats",
    *   name="dashboard.stats"
    * )
    *
    * @Template("StatsBundle:Dashboard:stats.html.twig")
    */
    public function statsAction(Request $request)
    {   
        $student = 'ROLE_STUDENT';
        $teacher = 'ROLE_TEACHER';

    	$stats = new Stats();

    	$doctrine = $this->getDoctrine();
    	$em = $doctrine->getManager();
    	
    	// total articles
        $query = $em->createQuery('SELECT COUNT(a.id) FROM SpljBundle:Article a WHERE a.status != 2');
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
        $query = $em->createQuery('SELECT COUNT(u.id) FROM UserBundle:User u WHERE u.roles LIKE :student')->setParameter('student', '%' .$student. '%');
        $studentCount = $query->getSingleResult();
        $stats->setTotalStudent($studentCount[1]);

        // total profs
        $query = $em->createQuery('SELECT COUNT(u.id) FROM UserBundle:User u WHERE u.roles LIKE :teacher')->setParameter('teacher', '%' .$teacher. '%');
        $teacherCount = $query->getSingleResult();
        $stats->setTotalTeacher($teacherCount[1]);

        // Tableau profs
        $query = $em->createQuery(
            'SELECT u.username, 
                (SELECT count(m.id)
                    FROM SpljBundle:Mcq m
                    WHERE m.userId = u.id
                    AND m.status != 2
                    AND u.roles LIKE :teacher
                    GROUP BY u.username) AS mcqs, 
                (SELECT count(a.id)
                    FROM SpljBundle:Article a
                    WHERE a.userId = u.id
                    AND a.status != 2
                    AND u.roles LIKE :teacher
                    GROUP BY u.username) AS articles,
                (SELECT count(q.id)
                    FROM SpljBundle:question q, SpljBundle:mcq x
                    WHERE x.userId = u.id
                    AND x.status != 2
                    AND u.roles LIKE :teacher
                    AND x.id = q.idQcm
                    GROUP BY u.username) AS questions 
            FROM UserBundle:User u
            WHERE u.roles LIKE :teacher')->setParameter('teacher', '%' .$teacher. '%');;

        $teacherStats = $query->getResult();
        $stats->setTeacherArray($teacherStats);
       
        // tableau eleves
        $query = $em->createQuery(
            'SELECT u.username,
        		(SELECT count(s.id)
	        		FROM SpljBundle:Score s
	        		WHERE s.userId = u.id
	        		AND u.roles LIKE :student
	        		GROUP BY u.username) AS mcqs,
       			(SELECT SUM(c.score)
       				FROM SpljBundle:Score c
       				WHERE c.userId = u.id
	        		AND u.roles LIKE :student
	        		GROUP BY u.username) AS score,
        		(SELECT SUM(x.scoreMax)
       				FROM SpljBundle:Score x
       				WHERE x.userId = u.id
	        		AND u.roles LIKE :student
	        		GROUP BY u.username) AS scoreMax
        	FROM UserBundle:User u
        	WHERE u.roles LIKE :student')->setParameter('student', '%' .$student. '%');

        $studentStats = $query->getResult();
        $stats->setStudentArray($studentStats);

        // chart articles
        $query = $em->createQuery(
            'SELECT COUNT(a) FROM SpljBundle:Article a WHERE a.status != 2 GROUP BY a.userId'
            );
        $count = $query->getResult();
        $maxArticles = 0;

        for ($i=0; $i < sizeOf($count); $i++) {
            if ($maxArticles < $count[$i][1]) {
                $maxArticles = $count[$i][1];
            }
        }
        $coefArticle = ceil($maxArticles /5);
        $stats->setCoefArticle($coefArticle);

        // chart mcq
        $query = $em->createQuery(
            'SELECT COUNT(m) FROM SpljBundle:Mcq m WHERE m.status != 2 GROUP BY m.userId'
            );
        $countMcq = $query->getResult();
        $maxMcq = 0;
        for ($i=0; $i < sizeOf($countMcq); $i++) {
            if ($maxMcq < $countMcq[$i][1]) {
                $maxMcq = $countMcq[$i][1];
            }
        }
        $coefMcq = ceil($maxMcq /5);
        $stats->setCoefMcq($coefMcq);

        // chart questions
        $query = $em->createQuery(
            'SELECT SUM(m.nbQuestions) FROM SpljBundle:Mcq m WHERE m.status != 2 GROUP BY m.userId'
            );
        $countQuestion = $query->getResult();
        $maxQuestion = 0;
        for ($i=0; $i < sizeOf($countQuestion); $i++) {
            if ($maxQuestion < $countQuestion[$i][1]) {
                $maxQuestion = $countQuestion[$i][1];
            }
        }
        $coefQuestion = ceil($maxQuestion /5);
        $stats->setCoefQuestion($coefQuestion);

         // chart student mcq
        $query = $em->createQuery(
            'SELECT COUNT(s.mcqId) FROM SpljBundle:Score s GROUP BY s.userId'
            );
        $countMcqStudent = $query->getResult();
        $maxMcq = 0;
        for ($i=0; $i < sizeOf($countMcqStudent); $i++) {
            if ($maxMcq < $countMcqStudent[$i][1]) {
                $maxMcq = $countMcqStudent[$i][1];
            }
        }
        $coefMcqStudent = ceil($maxMcq /5);
        $stats->setCoefMcqStudent($coefMcqStudent);

        /*score*/
        $query = $em->createQuery(
            'SELECT SUM(s.scoreMax) FROM SpljBundle:Score s GROUP BY s.userId'
            );
        $countScoreMax = $query->getResult();
        $maxScore = 0;
        for ($i=0; $i < sizeOf($countScoreMax); $i++) {
            if ($maxScore < $countScoreMax[$i][1]) {
                $maxScore = $countScoreMax[$i][1];
            }
        }
        $coefScore = ceil($maxScore /5);
        $stats->setCoefScore($coefScore);
      	return array(
      		'stats' => $stats
      	);
    }
}