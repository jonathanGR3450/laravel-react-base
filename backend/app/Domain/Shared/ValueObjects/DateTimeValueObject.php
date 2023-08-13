<?php

declare(strict_types=1);

namespace App\Domain\Shared\ValueObjects;

use DateTimeImmutable;
use DateTimeZone;

class DateTimeValueObject extends DateTimeImmutable implements DateTimeInterface
{

    public function value(): string
    {
        return $this->setTimezone(new DateTimeZone(static::DATETIME_ZONE))->format(static::DATETIME_FORMAT);
    }

    public static function fromPrimitives(string $datetime): static
    {
        return new static($datetime);
    }

    public static function now(): static
    {
        return new static('now');
    }
}