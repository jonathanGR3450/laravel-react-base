<?php

declare(strict_types=1);

namespace App\Application\Blog;

use App\Domain\Shared\ValueObjects\DateTimeValueObject;
use App\Domain\Blog\Aggregate\Blog;
use App\Domain\Blog\Events\BlogRegistered;
use App\Domain\Blog\BlogRepositoryInterface;
use App\Domain\Blog\ValueObjects\Id;
use App\Domain\Blog\ValueObjects\Description;
use App\Domain\Blog\ValueObjects\Name;
use App\Domain\Blog\ValueObjects\UserId;

final class CreateBlogUseCase
{
    private BlogRepositoryInterface $userRepositoryInterface;

    public function __construct(BlogRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(
        string $name,
        string $description,
    ): Blog {
        $user_id = auth()->user()->id;
        $user = Blog::create(
            Id::random(),
            Name::fromString($name),
            Description::fromString($description),
            UserId::fromPrimitives($user_id),
            DateTimeValueObject::now()
        );

        $this->userRepositoryInterface->create($user);
        return $user;
    }
}
