<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ShiftRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

use Symfony\Component\Serializer\Annotation\Groups as SerialGroups;

#[ORM\Entity(repositoryClass: ShiftRepository::class)]
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
    normalizationContext: ['groups' => ['shift:read']],
    denormalizationContext: ['groups' => ['shift:write']],
)]
#[ApiFilter(SearchFilter::class, properties: ['deliverer.id' => 'exact'])]
class Shift
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[SerialGroups([
      'shift:read',
      'shift:write',
      'deliverer:read',
      'delivery:read',
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 32)]
    #[SerialGroups([
      'shift:read',
      'shift:write',
      'deliverer:read',
      'delivery:read',
    ])]
    private ?string $name = null;

    #[ORM\Column]
    #[SerialGroups([
      'shift:read',
      'shift:write',
      'deliverer:read',
      'delivery:read',
    ])]
    #[ApiFilter(SearchFilter::class)]
    private ?\DateTimeImmutable $startingDate = null;

    #[ORM\Column]
    #[SerialGroups([
      'shift:read',
      'shift:write',
      'deliverer:read',
      'delivery:read',
    ])]
    #[ApiFilter(SearchFilter::class)]
    private ?\DateTimeImmutable $endingDate = null;

    #[ORM\OneToMany(mappedBy: 'shift', targetEntity: Delivery::class)]
    #[SerialGroups([
      'shift:read',
      'shift:write',
      'deliverer:read',
      'delivery:read',
    ])]
    private Collection $deliveries;

    #[ORM\ManyToOne(inversedBy: 'shifts')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'SET NULL')]
    #[SerialGroups([
      'shift:read',
      'shift:write',
      'deliverer:read',
      'delivery:read',
    ])]
    private ?Deliverer $deliverer = null;

    public function __construct()
    {
        $this->deliveries = new ArrayCollection();
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

    /**
     * @return Collection<int, Delivery>
     */
    public function getDeliveries(): Collection
    {
        return $this->deliveries;
    }

    public function addDelivery(Delivery $delivery): static
    {
        if (!$this->deliveries->contains($delivery)) {
            $this->deliveries->add($delivery);
            $delivery->setShift($this);
        }

        return $this;
    }

    public function removeDelivery(Delivery $delivery): static
    {
        if ($this->deliveries->removeElement($delivery)) {
            // set the owning side to null (unless already changed)
            if ($delivery->getShift() === $this) {
                $delivery->setShift(null);
            }
        }

        return $this;
    }

    public function getDeliverer(): ?Deliverer
    {
        return $this->deliverer;
    }

    public function setDeliverer(?Deliverer $deliverer): static
    {
        $this->deliverer = $deliverer;

        return $this;
    }
}
