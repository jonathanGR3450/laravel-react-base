<?php

namespace App\Domain\User\ValueObjects;

use App\Domain\Shared\Exception\InvalidArgumentException;
use App\Domain\Shared\ValueObjects\StringValueObject;

final class Email extends StringValueObject
{

    /**
     * UserEmail constructor.
     * @param string $value
     * @throws InvalidArgumentException
     */
    public function __construct(string $value)
    {
        $this->validate($value);
        $this->value = $value;
    }

    /**
     * @param string $value
     * @throws InvalidArgumentException
     */
    private function validate(string $value): void
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException(
                sprintf('<%s> does not allow the invalid email: <%s>.', static::class, $value)
            );
        }
    }
}
