<?php

declare(strict_types=1);

namespace App\Application\User;

use App\Domain\Shared\Model\CriteriaField;
use App\Domain\Shared\Model\CriteriaSort;
use App\Domain\Shared\Model\CriteriaSortDirection;
use App\Domain\Shared\ValueObjects\DateTimeValueObject;
use App\Domain\User\Aggregate\User;
use App\Domain\User\UserRepositoryInterface;
use App\Domain\User\UserSearchCriteria;
use App\Domain\User\ValueObjects\Id;

final class ShowUserUseCase
{
    private UserRepositoryInterface $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(string $id): User
    {
        $user = $this->userRepositoryInterface->findById(Id::fromPrimitives($id));

        return $user;
    }
}