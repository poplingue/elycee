<?php
namespace SpljBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class CorrectQuestionValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
    	print_r($value);
    	$nbQuestions = sizeof($value);
    	print_r($nbQuestions);
    	for ($i=0; $i < $nbQuestions; $i++) { 
    		$intituleQuestion = $value->get($i)->getQuestion();
    		echo 'Je suis dans le for';
    		print_r($value->get($i)->getQuestion());
    		echo 'Je suis apres le print de la question';
	        if ($intituleQuestion == null || strlen($intituleQuestion) == 0) {
	        	echo 'Je suis dans le if';
	            $this->context->addViolation($constraint->message);
	        }
    	}
    }
}