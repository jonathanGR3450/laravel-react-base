<?php

namespace App\UserInterface\Controller\Blog;

use App\Application\Blog\DestroyBlogUseCase;
use App\Infrastructure\Laravel\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class DestroyBlogController extends Controller
{

    private DestroyBlogUseCase $destroyBlogUseCase;

    public function __construct(DestroyBlogUseCase $destroyBlogUseCase) {
        $this->destroyBlogUseCase = $destroyBlogUseCase;
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(string $id): JsonResponse
    {
        $this->destroyBlogUseCase->__invoke($id);

        return Response::json([], JsonResponse::HTTP_NO_CONTENT);
    }
}
