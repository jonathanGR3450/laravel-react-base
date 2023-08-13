<?php

declare(strict_types=1);

namespace App\Domain\Shared\ValueObjects;

class BooleanValueObject
{
    protected bool $value;

    public function __construct(bool $value) {
        $this->value = $value;
    }

    public function __toString(): string
    {
        return $this->value() ? 'true' : 'false';
    }

    public function value(): bool
    {
        return $this->value;
    }

    public static function fromBoolean(bool $value): static
    {
        return new static($value);
    }

    public function equals(BooleanValueObject $booleanValueObject)
    {
        return $this->value() == $booleanValueObject->value();
    }

    public function isTrue(): bool
    {
        return $this->value() === true;
    }

    public function isFalse(): bool
    {
        return $this->value() === false;
    }
}
