<?php

namespace App\UserInterface\Controller\Blog;

use App\Application\Blog\ShowBlogUseCase;
use App\Infrastructure\Laravel\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class ShowBlogController extends Controller
{
    private ShowBlogUseCase $showBlogUseCase;

    public function __construct(ShowBlogUseCase $showBlogUseCase) {
        $this->showBlogUseCase = $showBlogUseCase;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(string $id): JsonResponse
    {
        $user = $this->showBlogUseCase->__invoke($id);

        return Response::json([
            'status' => 'success',
            'message' => 'Blog show successful',
            'data' => $user->asArray()
        ], JsonResponse::HTTP_OK);
    }
}
