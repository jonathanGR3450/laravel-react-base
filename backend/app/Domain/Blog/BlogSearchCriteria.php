<?php

declare(strict_types=1);

namespace App\Domain\Blog;

use App\Domain\Shared\Model\Criteria;
use App\Domain\Shared\Model\CriteriaPagination;

final class BlogSearchCriteria extends Criteria
{
    public const PAGINATION_SIZE = 10;

    private ?string $name = null;
    private ?string $userId = null;

    public static function create(?int $offset = null, string $name = null, string $userId = null): BlogSearchCriteria
    {
        $criteria = new self(
            CriteriaPagination::create(self::PAGINATION_SIZE, $offset)
        );

        if (!empty($name)) {
            $criteria->name = $name;
        }

        if (!empty($userId)) {
            $criteria->userId = $userId;
        }

        return $criteria;
    }

    public function name(): ?string
    {
        return $this->name;
    }

    public function userId(): ?string
    {
        return $this->userId;
    }
}