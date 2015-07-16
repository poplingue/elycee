<?php

namespace SpljBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class McqType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
            ->add('title', 'text')
            ->add('theme', 'text')
            ->add('user_id', 'hidden')
            ->add('nbQuestions', 'choice', array(
            'choices' => array(
                1 => '1',
                2 => '2',
                3 => '3',
                4 => '4',
                5 => '5'
            ),
            'required'    => true,
            'empty_value' => '',
            'empty_data'  => null
            ))
             ->add('status', 'choice', array(
            'choices' => array(
                1 => 'non publié',
                2 => 'publié',
            ),
            'empty_data'  => null
            ));
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SpljBundle\Entity\Mcq'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'mcq';
    }
}
