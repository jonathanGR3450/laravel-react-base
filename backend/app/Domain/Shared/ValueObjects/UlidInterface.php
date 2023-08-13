<?php

declare(strict_types=1);

namespace App\Domain\Shared\ValueObjects;

interface UlidInterface
{
    public function __toString(): string;

    public static function random(): static;

    public function value(): string;

    public function equals(UlidInterface $ulidInterface): bool;

    public static function fromPrimitives(string $value): static;
}