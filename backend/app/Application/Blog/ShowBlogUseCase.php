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
use App\Domain\Blog\ValueObjects\Id;

final class ShowBlogUseCase
{
    private BlogRepositoryInterface $userRepositoryInterface;

    public function __construct(BlogRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(string $id): Blog
    {
        $user = $this->userRepositoryInterface->findById(Id::fromPrimitives($id));

        return $user;
    }
}