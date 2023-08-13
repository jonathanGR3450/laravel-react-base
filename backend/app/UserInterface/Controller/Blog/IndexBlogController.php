<?php

namespace App\UserInterface\Controller\Blog;

use App\Application\Blog\IndexBlogUseCase;
use App\Infrastructure\Laravel\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class IndexBlogController extends Controller
{
    private IndexBlogUseCase $indexBlogUseCase;

    public function __construct(IndexBlogUseCase $indexBlogUseCase) {
        $this->indexBlogUseCase = $indexBlogUseCase;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $users = $this->indexBlogUseCase->__invoke(
            (int) $request->query('offset'),
            $request->query('name'),
            $request->query('user_id'),
        );

        return Response::json([
            'status' => 'success',
            'message' => 'Successful obtained blogs',
            'data' => $users
        ], JsonResponse::HTTP_OK);
    }
}
