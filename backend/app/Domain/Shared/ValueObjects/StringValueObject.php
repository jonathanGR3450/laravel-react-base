<?php

declare(strict_types=1);

namespace App\Domain\Shared\ValueObjects;

class StringValueObject
{

    protected string $value;

    public function __construct(string $value) {
        $this->value = $value;
    }

    public function value(): string
    {
        return $this->value;
    }

    public function __toString(): string
    {
        return $this->value();
    }

    public static function fromString(string $value): static
    {
        return new static($value);
    }

    public function isEmpty(): bool
    {
        return empty($this->value());
    }

    public function equals(StringValueObject $stringValueObject): bool
    {
        return $this->value() === $stringValueObject->value();
    }
}