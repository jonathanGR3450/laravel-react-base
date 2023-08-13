<?php

declare(strict_types=1);

namespace App\Infrastructure\Blog;

use App\Domain\Shared\ValueObjects\DateTimeValueObject;
use App\Domain\Blog\Aggregate\Blog;
use App\Domain\Blog\Exception\BlogNotFoundException;
use App\Domain\Blog\BlogRepositoryInterface;
use App\Domain\Blog\BlogSearchCriteria;
use App\Domain\Blog\ValueObjects\Address;
use App\Domain\Blog\ValueObjects\CellPhone;
use App\Domain\Blog\ValueObjects\City;
use App\Domain\Blog\ValueObjects\Email;
use App\Domain\Blog\ValueObjects\Id;
use App\Domain\Blog\ValueObjects\Identification;
use App\Domain\Blog\ValueObjects\IsManager;
use App\Domain\Blog\ValueObjects\IsSigner;
use App\Domain\Blog\ValueObjects\IsVerified;
use App\Domain\Blog\ValueObjects\LastName;
use App\Domain\Blog\ValueObjects\Name;
use App\Domain\Blog\ValueObjects\Password;
use App\Domain\Blog\ValueObjects\CityRegister;
use App\Domain\Blog\ValueObjects\Description;
use App\Domain\Blog\ValueObjects\UserId;
use App\Infrastructure\Laravel\Models\Blog as ModelsBlog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class BlogRepository implements BlogRepositoryInterface
{
    public function create(Blog $user): void
    {
        $blogModel = new ModelsBlog();

        $blogModel->id = $user->id()->value();
        $blogModel->name = $user->name()->value();
        $blogModel->description = $user->description()->value();
        $blogModel->user_id = $user->userId()->value();
        $blogModel->created_at = DateTimeValueObject::now()->value();

        $blogModel->save();
    }

    public function update(Blog $user): void
    {
        $blogModel = ModelsBlog::find($user->id()->value());

        $blogModel->id = $user->id()->value();
        $blogModel->name = $user->name()->value();
        $blogModel->description = $user->description()->value();
        $blogModel->user_id = $user->userId()->value();
        $blogModel->updated_at = DateTimeValueObject::now()->value();

        $blogModel->save();
    }

    public function findById(Id $id): Blog
    {
        $blogModel = ModelsBlog::find($id->value());

        if (empty($blogModel)) {
            throw new BlogNotFoundException('Blog does not exist');
        }

        return self::map($blogModel);
    }

    public function searchById(Id $id): ?Blog
    {
        $blogModel = ModelsBlog::find($id->value());

        return $blogModel != null ? self::map($blogModel) : null;
    }

    public function searchByCriteria(BlogSearchCriteria $criteria): array
    {
        $blogModel = new ModelsBlog();

        if (!empty($criteria->userId())) {
            $blogModel = $blogModel->where('user_id', '=', "" . $criteria->userId() . "");
        }

        if (!empty($criteria->name())) {
            $blogModel = $blogModel->where('name', 'ILIKE', "%" . $criteria->name() . "%");
        }

        if ($criteria->pagination() !== null) {
            $blogModel = $blogModel->take($criteria->pagination()->limit()->value())
                                    ->skip($criteria->pagination()->offset()->value());
        }

        if ($criteria->sort() !== null) {
            $blogModel = $blogModel->orderBy($criteria->sort()->field()->value(), $criteria->sort()->direction()->value());
        }

        return array_map(
            static fn (ModelsBlog $user) => self::map($user),
            $blogModel->get()->all()
        );
    }

    public function delete(Blog $user): void
    {
        $blogModel = ModelsBlog::find($user->id()->value());

        $blogModel->delete();
    }

    public static function map(ModelsBlog $model): Blog
    {
        return Blog::create(
            Id::fromPrimitives($model->id),
            Name::fromString($model->name),
            Description::fromString($model->description),
            UserId::fromPrimitives($model->user_id),
            DateTimeValueObject::fromPrimitives($model->created_at->__toString()),
            !empty($model->updated_at) ? DateTimeValueObject::fromPrimitives($model->updated_at->__toString()) : null,
        );
    }
}
