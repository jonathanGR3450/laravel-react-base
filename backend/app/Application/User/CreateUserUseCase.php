<?php

declare(strict_types=1);

namespace App\Application\User;

use App\Domain\Shared\ValueObjects\DateTimeValueObject;
use App\Domain\User\Aggregate\User;
use App\Domain\User\Events\UserRegistered;
use App\Domain\User\UserRepositoryInterface;
use App\Domain\User\ValueObjects\Address;
use App\Domain\User\ValueObjects\CellPhone;
use App\Domain\User\ValueObjects\City;
use App\Domain\User\ValueObjects\CityRegister;
use App\Domain\User\ValueObjects\Email;
use App\Domain\User\ValueObjects\Id;
use App\Domain\User\ValueObjects\Identification;
use App\Domain\User\ValueObjects\IsManager;
use App\Domain\User\ValueObjects\IsSigner;
use App\Domain\User\ValueObjects\IsVerified;
use App\Domain\User\ValueObjects\LastName;
use App\Domain\User\ValueObjects\Name;
use App\Domain\User\ValueObjects\Password;

final class CreateUserUseCase
{
    private UserRepositoryInterface $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(
        string $name,
        string $last_name,
        string $email,
        int $identification,
        int $cell_phone,
        string $city,
        string $address,
        string $city_register,
        bool $is_manager,
        bool $is_signer,
        ?string $is_verified = null,
        string $password,
    ): User {
        $user = User::create(
            Id::random(),
            Name::fromString($name),
            LastName::fromString($last_name),
            Email::fromString($email),
            Identification::fromInteger($identification),
            CellPhone::fromInteger($cell_phone),
            City::fromString($city),
            Address::fromString($address),
            CityRegister::fromString($city_register),
            IsManager::fromBoolean($is_manager),
            IsSigner::fromBoolean($is_signer),
            !empty($is_verified) ? IsVerified::fromString($is_verified) : null,
            Password::fromString($password),
            DateTimeValueObject::now()
        );

        $this->userRepositoryInterface->create($user);

        # dispatched user register notify
        event(new UserRegistered($user));
        return $user;
    }
}
