<?php

namespace App\UserInterface\Controller\User;

use App\Application\User\IndexUserUseCase;
use App\Infrastructure\Laravel\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class IndexUserController extends Controller
{
    private IndexUserUseCase $indexUserUseCase;

    public function __construct(IndexUserUseCase $indexUserUseCase) {
        $this->indexUserUseCase = $indexUserUseCase;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $users = $this->indexUserUseCase->__invoke(
            (int) $request->query('offset'),
            $request->query('email'),
            $request->query('name'),
        );

        return Response::json([
            'data' => $users
        ], JsonResponse::HTTP_OK);
    }
}
