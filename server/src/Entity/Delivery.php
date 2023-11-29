<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DeliveryRepository;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use App\Repository\DelivererRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;

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
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 32, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $pickUpAdress = null;

    #[ORM\Column(length: 255)]
    private ?string $dropOffAdress = null;

    #[ORM\ManyToOne(inversedBy: 'deliveries')]
    private ?Shift $shift = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPickUpAdress(): ?string
    {
        return $this->pickUpAdress;
    }

    public function setPickUpAdress(string $pickUpAdress): static
    {
        $this->pickUpAdress = $pickUpAdress;

        return $this;
    }

    public function getDropOffAdress(): ?string
    {
        return $this->dropOffAdress;
    }

    public function setDropOffAdress(string $dropOffAdress): static
    {
        $this->dropOffAdress = $dropOffAdress;

        return $this;
    }

    public function getShift(): ?Shift
    {
        return $this->shift;
    }

    public function setShift(?Shift $shift): static
    {
        $this->shift = $shift;

        return $this;
    }
}
