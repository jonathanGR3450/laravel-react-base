<?php

declare(strict_types=1);

namespace App\Application\User;

use App\Domain\Shared\ValueObjects\DateTimeValueObject;
use App\Domain\User\Aggregate\User;
use App\Domain\User\UserRepositoryInterface;
use App\Domain\User\ValueObjects\Email;
use App\Domain\User\ValueObjects\Id;
use App\Domain\User\ValueObjects\Name;
use App\Domain\User\ValueObjects\Password;

final class UpdateUserUseCase
{
    private UserRepositoryInterface $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(string $name, string $email, string $password, string $id): User
    {
        $user = $this->userRepositoryInterface->findById(Id::fromPrimitives($id));

        if($name){
            $user->updateName($name);
        }

        if($email){
            $user->updateEmail($email);
        }

        if($password){
            $user->updatePassword($password);
        }

        $this->userRepositoryInterface->update($user);

        return $user;
    }
}