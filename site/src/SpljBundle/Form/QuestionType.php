<?php

namespace SpljBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class QuestionType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        
        for ($i=0; $i < $options['nbQuestion']; $i++) {
            echo 'test';
        }
        $builder->add('question','textarea')
                ->add('answers','collection', array(
                    'type' => new AnswerType(),
                    'cascade_validation' => true,
                    'allow_add' => true,
                ));
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SpljBundle\Entity\Question',
            'nbQuestion' => null,
            'cascade_validation' => true
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'question';
    }
}
