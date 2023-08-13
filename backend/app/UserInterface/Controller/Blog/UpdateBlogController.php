<?php

namespace App\UserInterface\Controller\Blog;

use App\Application\Blog\UpdateBlogUseCase;
use App\Infrastructure\Laravel\Controller;
use App\UserInterface\Requests\Auth\BlogFormRequest;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class UpdateBlogController extends Controller
{
    private UpdateBlogUseCase $updateBlogUseCase;

    public function __construct(UpdateBlogUseCase $updateBlogUseCase) {
        $this->updateBlogUseCase = $updateBlogUseCase;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(BlogFormRequest $request, string $id)
    {
        $blog = $this->updateBlogUseCase->__invoke($request->input('name'), $request->input('description'), $id);

        return Response::json([
            'status' => 'success',
            'message' => 'Blog update successful',
            'data' => $blog->asArray()
        ], JsonResponse::HTTP_OK);
    }
}
