<?php

namespace SpljBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use SpljBundle\Entity\User;
use SpljBundle\Form\UserType;

use Symfony\Component\HttpFoundation\Request as Request;
use Symfony\Component\HttpFoundation\Session\Session;
/**
 * @Route("/home")
 */

class UserController extends Controller
{
	/**
    * @Route(
    * 	"/login",
    * 	name="splj.window.login"
    * )
    *
    * @Template("SpljBundle:Window:login.html.twig")
    */
    public function loginAction(Request $request)
    {
    	$doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();

        
        
     //        // Les noms d'utilisateurs à créer
    	// $listNames = array('Paulette', 'Mitch', 'Bousile');

	    // foreach ($listNames as $name) {
	    //   // On crée l'utilisateur
	    //   $user = new User;

	    //   // Le nom d'utilisateur et le mot de passe sont identiques
	    //   $user->setUsername($name);
	    //   $user->setPassword($name);
	    //   $user->setProfil(1);

	    //   // On ne se sert pas du sel pour l'instant
	    //   $user->setSalt('');
	    //   // On définit uniquement le role ROLE_USER qui est le role de base
	    //   $user->setRoles(array('ROLE_ADMIN'));

	    //   // On le persiste
	    //   $em->persist($user);
	    // }

	    // // On déclenche l'enregistrement
	    // $em->flush();
        
        


        $entity = new User();
        $type = new UserType();
            
        $form = $this->createForm($type,$entity, array(
            'action' => $this->generateUrl('login_check'),
            'method' => 'POST',
        ));
        $form->handleRequest($request);

        if($form->isSubmitted()){
        	$qb = $this->getDoctrine()->getRepository('SpljBundle:User')->createQueryBuilder('u');
            $qb->select(array('u'))
                ->from('SpljBundle:User', 'user')
                ->where('u.username = :username')
                ->andWhere('u.password = :password')
                ->setParameter('username', $entity->getUsername())
                ->setParameter('password', $entity->getPassword());
            $query = $qb->getQuery();
            $user = $query->getResult();

	        $session = new Session();
            if ($user != null) {
				$session->set('user', $user);
				$session->set('errorlogin', false);
            	return $this->redirect($this->generateUrl('splj.dashboard.list-mcq', array('id'=>$user[0]->getProfil())));
            }else{
				$session->set('errorlogin', true);
            	return $this->redirect($this->generateUrl('splj.window.login'));
            }
            
        }
        return array(
            'form' => $form->createView()
        );
    }

    /**
     * @Route("/login_check", name="login_check")
     */
    public function loginCheckAction()
    {
        // this controller will not be executed,
        // as the route is handled by the Security system
    }
}