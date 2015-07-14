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
        	->add('user_id', 'hidden')
        	->add('date', 'date', array(
                'data' => new \DateTime("now"),
                'format' => 'dd-MMM-yyyy',
                'input' => 'datetime'
            ))
        	->add('content', 'textarea')
        	->add('extract', 'textarea')
        	->add('image', 'file')
        	->add('status', 'choice', array(
            	'choices' => array(
               		0 => 'non publié',
                	1 => 'publié'
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
