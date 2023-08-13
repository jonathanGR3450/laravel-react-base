<?php

declare(strict_types=1);

namespace App\Application\Blog;

use App\Domain\Blog\Aggregate\Blog;
use App\Domain\Blog\BlogRepositoryInterface;
use App\Domain\Blog\ValueObjects\Id;

final class UpdateBlogUseCase
{
    private BlogRepositoryInterface $userRepositoryInterface;

    public function __construct(BlogRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function __invoke(
        string $name,
        string $description,
        string $id
    ): Blog
    {
        $user = $this->userRepositoryInterface->findById(Id::fromPrimitives($id));

        if($name){
            $user->updateName($name);
        }

        if($description){
            $user->updateDescription($description);
        }

        $this->userRepositoryInterface->update($user);

        return $user;
    }
}