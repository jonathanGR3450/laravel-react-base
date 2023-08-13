<?php

declare(strict_types=1);

namespace App\Domain\User\ValueObjects;

use App\Domain\Shared\Exception\InvalidArgumentException;
use App\Domain\Shared\ValueObjects\StringValueObject;
use App\Domain\User\Exception\UserPasswordMinLengthException;

class Password extends StringValueObject
{
    public function __construct(string $value)
    {
        $this->guard($value);
        $this->value = $value;
    }

    private function guard(string $value): void
    {
        $password_regex = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/";
        if (!preg_match($password_regex, $value)) {
            throw new InvalidArgumentException(sprintf('<%s> does not allow the invalid password: <%s>. Password must have at least 8 characters, at least one number, at least one uppercase letter, at least one lowercase letter, at least one special character.', static::class, $value));
        }
    }
}
