<?php

declare(strict_types=1);

namespace App\Application\Blog;

use App\Domain\Shared\Model\CriteriaField;
use App\Domain\Shared\Model\CriteriaSort;
use App\Domain\Shared\Model\CriteriaSortDirection;
use App\Domain\Shared\ValueObjects\DateTimeValueObject;
use App\Domain\Blog\Aggregate\Blog;
use App\Domain\Blog\BlogRepositoryInterface;
use App\Domain\Blog\BlogSearchCriteria;

final class IndexBlogUseCase
{
    private BlogRepositoryInterface $userRepositoryInterface;

    public function __construct(BlogRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(?int $offset = null, ?string $name = null, ?string $user_id = null): array
    {
        $criteria = BlogSearchCriteria::create($offset, $name, $user_id);
        $criteria->sortBy(new CriteriaSort(CriteriaField::fromString('name'), CriteriaSortDirection::ASC));
        $users = $this->userRepositoryInterface->searchByCriteria($criteria);

        return array_map(fn (Blog $user) => $user->asArray(), $users);
    }
}