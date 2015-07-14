<?php

namespace SpljBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ArticleType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
        	->add('title', 'text')
        	->add('date', 'date')
        	->add('content', 'textarea')
        	->add('extract', 'textarea')
        	->add('image', 'file')
        	->add('status', 'choice', array(
            	'choices' => array(
               		1 => 'non publié',
                	2 => 'publié'
            	))
        	);
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SpljBundle\Entity\Article',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'article';
    }
}
