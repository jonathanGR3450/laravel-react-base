<?php

declare(strict_types=1);

namespace App\Domain\Blog;

use App\Domain\Blog\Aggregate\Blog;
use App\Domain\Blog\Exception\BlogNotFoundException;
use App\Domain\Blog\ValueObjects\Id;
use App\Infrastructure\Laravel\Models\Blog as ModelsBlog;

interface BlogRepositoryInterface
{
    public function create(Blog $blog): void;

    public function update(Blog $blog): void;

    /**
     * @throws BlogNotFoundException
     */
    public function findById(Id $id): Blog;

    public function searchById(Id $id): ?Blog;

    public function searchByCriteria(BlogSearchCriteria $criteria): array;

    public function delete(Blog $blog): void;
}