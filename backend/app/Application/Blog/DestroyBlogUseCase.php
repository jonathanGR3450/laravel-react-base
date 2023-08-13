<?php

declare(strict_types=1);

namespace App\Application\Blog;

use App\Domain\Blog\Aggregate\Blog;
use App\Domain\Blog\BlogRepositoryInterface;
use App\Domain\Blog\ValueObjects\Id;

final class DestroyBlogUseCase
{
    private BlogRepositoryInterface $userRepositoryInterface;

    public function __construct(BlogRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(string $id): void
    {
        $user = $this->userRepositoryInterface->findById(Id::fromPrimitives($id));
        $this->userRepositoryInterface->delete($user);
    }
}