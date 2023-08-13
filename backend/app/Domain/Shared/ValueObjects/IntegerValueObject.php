<?php

declare(strict_types=1);

namespace App\Domain\Shared\ValueObjects;

class IntegerValueObject
{
    protected int $value;

    public function __construct(int $value)
    {
        $this->value = $value;
    }

    public function __toString(): string
    {
        return (string) $this->value;
    }

    public function value()
    {
        return $this->value;
    }

    public static function fromInteger(int $value): static
    {
        return new static($value);
    }

    public function isLessThan(IntegerValueObject $integerValueObject): bool
    {
        return $this->value() < $integerValueObject->value();
    }

    public function isZero(): bool
    {
        return $this->value() === 0;
    }

    public function equals(IntegerValueObject $integerValueObject): bool
    {
        return $this->value() === $integerValueObject->value();
    }

    public function addTo(IntegerValueObject $integerValueObject): IntegerValueObject
    {
        $amount = $this->value() + $integerValueObject->value();
        return new self($amount);
    }
}
