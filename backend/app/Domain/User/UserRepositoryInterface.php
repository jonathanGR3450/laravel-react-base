<?php

declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\User\Aggregate\User;
use App\Domain\User\Exception\UserNotFoundException;
use App\Domain\User\ValueObjects\Id;
use App\Infrastructure\Laravel\Models\User as ModelsUser;

interface UserRepositoryInterface
{
    public function create(User $user): void;

    public function update(User $user): void;

    /**
     * @throws UserNotFoundException
     */
    public function findById(Id $id): User;

    /**
     * @throws UserNotFoundException
     */
    public function findByIdGetModel(Id $id): ModelsUser;

    public function searchById(Id $id): ?User;

    public function searchByCriteria(UserSearchCriteria $criteria): array;

    public function delete(User $user): void;

    public function getAuthUser(): User|bool;
}