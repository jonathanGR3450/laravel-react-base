<?php

namespace App\UserInterface\Controller\User;

use App\Application\User\ShowUserUseCase;
use App\Infrastructure\Laravel\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class ShowUserController extends Controller
{
    private ShowUserUseCase $showUserUseCase;

    public function __construct(ShowUserUseCase $showUserUseCase) {
        $this->showUserUseCase = $showUserUseCase;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(string $id): JsonResponse
    {
        $user = $this->showUserUseCase->__invoke($id);

        return Response::json([
            'data' => $user->asArray()
        ], JsonResponse::HTTP_OK);
    }
}
