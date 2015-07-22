<?php

namespace SpljBundle\Redirection;
 
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

use SpljBundle\Entity\User;

use Symfony\Component\HttpFoundation\Request as Request;
use Doctrine\Bundle\DoctrineBundle\Registry as Doctrine;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
 
class AfterLoginRedirection implements AuthenticationSuccessHandlerInterface 
{
    /**
     * @var \Symfony\Component\Routing\RouterInterface
     */
    private $router;
 	
 	/** 
 	*	@var \Doctrine\ORM\EntityManager
 	*/
	private $em;

    /**
     * @param RouterInterface $router
     * @param Doctrine $doctrine
     */

    public function __construct(RouterInterface $router, Doctrine $doctrine)
    {
       $this->router = $router;
       $this->em = $doctrine->getEntityManager();
    }
 
    /**
     * @Route("", name="redirect.after.login")
     * @param Request $request
     * @param TokenInterface $token
     * @return RedirectResponse
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
    	$entity = new User();

    	$qb = $this->em->getRepository('SpljBundle:User')->createQueryBuilder('u');
        $qb->select(array('u'))
            ->from('SpljBundle:User', 'user')
            ->where('u.username = :username')
            ->andWhere('u.password = :password')
            ->setParameter('username', $username)
            ->setParameter('password', $password);
        $query = $qb->getQuery();
        $user = $query->getResult();
        print_r($user);
        $session = new Session();

        if ($user[0]->getProfil() != 0) {
	    	$redirection = new RedirectResponse($this->router->generate('splj.dashboard.list-mcq', array('id'=>$user[0]->getProfil())));
	    	return $redirection;
        }
    }
}