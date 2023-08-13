<?php

declare(strict_types=1);

namespace App\Domain\Blog\Exception;

use App\Domain\Shared\Exception\NotFoundException;

class BlogNotFoundException extends NotFoundException
{
}
