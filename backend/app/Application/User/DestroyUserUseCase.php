<?php

declare(strict_types=1);

namespace App\Application\User;

use App\Domain\User\Aggregate\User;
use App\Domain\User\UserRepositoryInterface;
use App\Domain\User\ValueObjects\Id;

final class DestroyUserUseCase
{
    private UserRepositoryInterface $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(string $id): void
    {
        $user = $this->userRepositoryInterface->findById(Id::fromPrimitives($id));
        $this->userRepositoryInterface->delete($user);
    }
}