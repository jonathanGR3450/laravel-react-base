<?php

declare(strict_types=1);

namespace App\Domain\Shared\ValueObjects;

class FloatValueObject
{

    protected float $value;

    const PRECISION = 10;

    public function __construct(float $value) {
        $this->value = $value;
    }

    public function __toString(): string
    {
        return (string) $this->value;
    }

    public function value(): float
    {
        return $this->value;
    }

    public static function fromFloat(float $value): static
    {
        return new static($value);
    }

    public function equalsTo(FloatValueObject $floatValueObject): bool
    {
        $epsilon = 1 / self::PRECISION;

        return abs($this->value - $floatValueObject->value()) < $epsilon;
    }

    public function addTo(FloatValueObject $floatValueObject): FloatValueObject
    {
        $amount = $this->value + $floatValueObject->value();
        return new self($amount);
    }

}