<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DeliveryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DeliveryRepository::class)]
#[ApiResource]
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
}
