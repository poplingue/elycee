<?php

namespace SpljBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class CorrectQuestion extends Constraint
{
    public $message = 'L\'intitulé de la question ne peut pas etre vide';
}
