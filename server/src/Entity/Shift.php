<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ShiftRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ShiftRepository::class)]
#[ApiResource]
class Shift
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 32)]
    private ?string $name = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $startingDate = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $endingDate = null;

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

    public function getStartingDate(): ?\DateTimeImmutable
    {
        return $this->startingDate;
    }

    public function setStartingDate(\DateTimeImmutable $startingDate): static
    {
        $this->startingDate = $startingDate;

        return $this;
    }

    public function getEndingDate(): ?\DateTimeImmutable
    {
        return $this->endingDate;
    }

    public function setEndingDate(\DateTimeImmutable $endingDate): static
    {
        $this->endingDate = $endingDate;

        return $this;
    }
}
