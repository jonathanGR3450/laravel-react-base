<?php

declare(strict_types=1);

namespace App\Domain\Blog\Aggregate;

use App\Domain\Blog\ValueObjects\Description;
use App\Domain\Blog\ValueObjects\Id;
use App\Domain\Blog\ValueObjects\Name;
use App\Domain\Blog\ValueObjects\UserId;
use App\Domain\Shared\ValueObjects\DateTimeValueObject;

final class Blog
{
    private function __construct(
        private Id $id,
        private Name $name,
        private Description $description,
        private UserId $userId,
        private DateTimeValueObject $created_at,
        private ?DateTimeValueObject $updated_at
    ) {
    }

    public static function create(
        Id $id,
        Name $name,
        Description $description,
        UserId $userId,
        DateTimeValueObject $created_at,
        ?DateTimeValueObject $updated_at = null
    ): self {
        return new self(
            $id,
            $name,
            $description,
            $userId,
            $created_at,
            $updated_at
        );
    }

    public function id(): Id
    {
        return $this->id;
    }

    public function userId(): UserId
    {
        return $this->userId;
    }

    public function name(): Name
    {
        return $this->name;
    }

    public function description(): Description
    {
        return $this->description;
    }

    public function createdAt(): DateTimeValueObject
    {
        return $this->created_at;
    }

    public function updatedAt(): ?DateTimeValueObject
    {
        return $this->updated_at;
    }

    public function updateName(string $name): void
    {
        $this->name = Name::fromString($name);
    }

    public function updateDescription(string $description): self
    {
        $this->description = Description::fromString($description);
        return $this;
    }

    public function updateUserId(string $userId): void
    {
        $this->userId = UserId::fromPrimitives($userId);
    }

    public function asArray(): array
    {
        return [
            'id' => $this->id()->value(),
            'name' => $this->name()->value(),
            'description' => $this->description()->value(),
            'user_id' => $this->userId()->value(),
            'created_at' => $this->createdAt()->value(),
            'updated_at' => $this->updatedAt()?->value()
        ];
    }
}
