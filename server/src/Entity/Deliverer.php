<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
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

use Symfony\Component\Serializer\Annotation\Groups as SerialGroups;

#[ORM\Entity(repositoryClass: DelivererRepository::class)]
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
    ],
    normalizationContext: ['groups' => ['deliverer:read']],
    denormalizationContext: ['groups' => ['deliverer:write']],
)]
class Deliverer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[SerialGroups([
      'deliverer:read',
      'deliverer:write',
      'shift:read'
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 32)]
    #[ApiFilter(OrderFilter::class)]
    #[SerialGroups([
      'deliverer:read',
      'deliverer:write',
      'shift:read'
    ])]
    private ?string $name = null;

    #[ORM\Column]
    #[ApiFilter(BooleanFilter::class)]
    #[SerialGroups([
      'deliverer:read',
      'deliverer:write',
      'shift:read'
    ])]
    private ?bool $available = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[ApiFilter(DateFilter::class)]
    #[ApiFilter(OrderFilter::class)]
    #[ApiProperty(writable: false)]
    #[SerialGroups([
      'deliverer:read',
      'deliverer:write',
      'shift:read'
    ])]
    private ?\DateTimeInterface $creationDate = null;
    
    #[ORM\OneToMany(mappedBy: 'deliverer', targetEntity: Shift::class)]
    #[SerialGroups([
      'deliverer:read',
      'deliverer:write'
    ])]
    private Collection $shifts;
    
    #[ORM\Column]
    #[ApiProperty(writable: false)]
    #[ApiFilter(OrderFilter::class)]
    #[SerialGroups([
      'deliverer:read',
      'shift:read'
    ])]
    private int $shiftsCount = 0;
    
    public function __construct()
    {   
        $this->creationDate = new DateTime();
        $this->shifts = new ArrayCollection();
        $this->shiftsCount = count($this->shifts->toArray());
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

    /**
     * @return Collection<int, Shift>
     */
    public function getShifts(): Collection
    {
        return $this->shifts;
    }

    public function getShiftsCount(): int
    {
      $this->shiftsCount = count($this->shifts->toArray());
      return $this->shiftsCount;
    }

    public function addShift(Shift $shift): static
    {
        if (!$this->shifts->contains($shift)) {
            $this->shifts->add($shift);
            $shift->setDeliverer($this);
            $this->shiftsCount += 1;
        }
        return $this;
    }

    public function removeShift(Shift $shift): static
    {
        if ($this->shifts->removeElement($shift)) {
            // set the owning side to null (unless already changed)
            if ($shift->getDeliverer() === $this) {
                $shift->setDeliverer(null);
            }
            $this->shiftsCount -= 1;
        }

        return $this;
    }
}
