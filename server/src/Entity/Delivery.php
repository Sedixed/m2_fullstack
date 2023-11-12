<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use App\Repository\DeliveryRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: DeliveryRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(
            paginationType: 'page',
            paginationClientItemsPerPage: true,
            paginationClientEnabled: true
        ),
        new Post(),
        new Patch(),
        new Delete()
    ]
)]
class Delivery
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\Column(type: Types::STRING)]
    #[Assert\Length(min: 3, max: 32)]
    #[ApiFilter(OrderFilter::class)]
    private ?string $name = null;

    #[ORM\Column(type: Types::STRING)]
    #[Assert\Length(max: 255), Assert\NotNull]
    #[ApiFilter(OrderFilter::class)]
    private ?string $pick_up_address = null;

    #[ORM\Column(type: Types::STRING)]
    #[Assert\Length(max: 255), Assert\NotNull]
    #[ApiFilter(OrderFilter::class)]
    private ?string $drop_off_address = null;

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

    public function isPickUpAddress(): ?bool
    {
        return $this->pick_up_address;
    }

    public function setPickUpAddress(bool $pick_up_address): static
    {
        $this->pick_up_address = $pick_up_address;

        return $this;
    }

    public function getDropOffAddress(): ?string
    {
        return $this->drop_off_address;
    }

    public function setDropOffAddress(string $drop_off_address): static
    {
        $this->drop_off_address = $drop_off_address;

        return $this;
    }
}
