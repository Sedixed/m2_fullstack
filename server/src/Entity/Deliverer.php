<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\DelivererRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: DelivererRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(
            paginationType: 'page',
            paginationItemsPerPage: 10,
            paginationClientEnabled: true
        ),
        new Post(),
        new Put(),
        new Delete()
    ]
)]
class Deliverer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    // #[ApiProperty(readable:false)]
    #[ApiFilter(OrderFilter::class)]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[ApiFilter(OrderFilter::class)]
    private ?string $name = null;

    #[ORM\Column]
    #[ApiFilter(BooleanFilter::class)]
    private ?bool $available = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[ApiFilter(DateFilter::class)]
    #[ApiProperty(writable: false)]
    private ?\DateTimeInterface $creationDate = null;

    public function __construct()
    {
        $this->creationDate = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function isAvailable(): ?bool
    {
        return $this->available;
    }

    public function setAvailable(bool $available): static
    {
        $this->available = $available;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): static
    {
        $this->creationDate = $creationDate;

        return $this;
    }
}
