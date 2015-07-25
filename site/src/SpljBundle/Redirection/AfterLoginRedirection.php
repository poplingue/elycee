<?php

namespace SpljBundle\Redirection;
 
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

use SpljBundle\Entity\User;

use Symfony\Component\HttpFoundation\Request as Request;
use Doctrine\Bundle\DoctrineBundle\Registry as Doctrine;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\Session;
 
class AfterLoginRedirection implements AuthenticationSuccessHandlerInterface 
{
    /**
     * @var \Symfony\Component\Routing\RouterInterface
     */
    private $router;

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $em;

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
    	
        $roles = $token->getRoles();
        $rolesTab = array_map(function($role){ 
        	return $role->getRole(); 
        }, $roles);

        $user = new User();
        // $userToken = $this->get('security.token_storage')->getToken()->getUser();

        $qb = $this->em->getRepository('SpljBundle:User')->createQueryBuilder('u');
        $qb->select(array('u'))
           ->from('SpljBundle:User', 'user')
            ->where('u.username = :username')
            ->setParameter('username', $token->getUsername());
        $query = $qb->getQuery();
        $user = $query->getResult();
       
        
        $session = $request->getSession();
        $session->set('user',$user[0]);

        if (in_array('ROLE_TEACHER', $rolesTab, true)){

            $redirection = new RedirectResponse($this->router->generate('splj.dashboard.list-mcq'));
        }else if(in_array('ROLE_STUDENT', $rolesTab, true)){
        	
            $redirection = new RedirectResponse($this->router->generate('splj.dashboard.list-mcq'));
        }
	    return $redirection;
    }
}
