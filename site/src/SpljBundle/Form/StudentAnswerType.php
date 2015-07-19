<?php

namespace SpljBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class StudentAnswerType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
        	->add('answer1', 'checkbox')
        	->add('answer2', 'checkbox')
        	->add('answer3', 'checkbox');
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SpljBundle\Entity\StudentAnswer'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'studentanswer';
    }
}
