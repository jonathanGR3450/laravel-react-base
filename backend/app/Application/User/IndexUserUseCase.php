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

final class IndexUserUseCase
{
    private UserRepositoryInterface $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(?int $offset = null, ?string $email = null, ?string $name = null): array
    {
        $criteria = UserSearchCriteria::create($offset, $email, $name);
        $criteria->sortBy(new CriteriaSort(CriteriaField::fromString('name'), CriteriaSortDirection::ASC));
        $users = $this->userRepositoryInterface->searchByCriteria($criteria);

        return array_map(fn (User $user) => $user->asArray(), $users);
    }
}