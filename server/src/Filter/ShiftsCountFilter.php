<?php

namespace App\Filter;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Symfony\Component\PropertyInfo\Type;
 
final class ShiftsCountFilter extends AbstractFilter
{   
    protected function filterProperty(
        string $property, 
        $value, 
        QueryBuilder $queryBuilder, 
        QueryNameGeneratorInterface $queryNameGenerator, 
        string $resourceClass, 
        Operation $operation = null, 
        array $context = []
    ): void {

      // Otherwise filter is applied to order and page as well
      if (
        !$this->isPropertyEnabled($property, $resourceClass) ||
        !$this->isPropertyMapped($property, $resourceClass)
    ) {
        return;
    }

        if ('order' !== $property || !array_key_exists('shifts', $value)) {
            return;
        }

        $queryBuilder
            ->select('o, COUNT(shifts) AS HIDDEN nb')
            ->join('o.shifts', 'shifts');
            //->addGroupBy('o.id')
            //->addOrderBy('nb', $value['shifts']);
    }

    // This function is only used to hook in documentation generators (supported by Swagger and Hydra)
    public function getDescription(string $resourceClass): array
    {
        $description["order[shifts]"] = [
            'type' => Type::BUILTIN_TYPE_STRING,
            'enum' => [
                'asc',
                'desc'
            ],
            'required' => false,
            'openapi' => [
                'allowReserved' => false,
                'allowEmptyValue' => true,
                'explode' => false,
            ],
        ];
        return $description;
    }
}