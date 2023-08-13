<?php declare(strict_types=1);

namespace App\Application\Auth\Contracts;

use App\Domain\User\Aggregate\User;

interface AuthUserInterface
{
    public function loginCredentials(string $email, string $password): string;

    public function loginUserModel(User $user): string;

    public function createUser(
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
        string $is_verified,
        string $password,
    ): User;

    public function logout(): void;

    public function refresh(): string;

    public function getAuthUser(): \Illuminate\Contracts\Auth\Authenticatable;

    public function getAuthUserAgreggate(): User|bool;

    public function getAuthenticatedUser(): \Illuminate\Contracts\Auth\Authenticatable;

}