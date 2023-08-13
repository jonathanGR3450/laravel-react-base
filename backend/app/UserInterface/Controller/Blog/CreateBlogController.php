<?php

namespace App\UserInterface\Controller\Blog;

use App\Application\Blog\CreateBlogUseCase;
use App\Infrastructure\Laravel\Controller;
use App\UserInterface\Requests\Auth\BlogFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class CreateBlogController extends Controller
{
    private CreateBlogUseCase $createBlogBlogcase;

    public function __construct(CreateBlogUseCase $createBlogBlogcase) {
        $this->createBlogBlogcase = $createBlogBlogcase;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(BlogFormRequest $request)
    {
        $user = $this->createBlogBlogcase->__invoke(
            $request->input('name'),
            $request->input('description')
        );

        return Response::json([
            'status' => 'success',
            'message' => 'Create blog successful',
            'data' => $user->asArray()
        ], JsonResponse::HTTP_CREATED);
    }
}
