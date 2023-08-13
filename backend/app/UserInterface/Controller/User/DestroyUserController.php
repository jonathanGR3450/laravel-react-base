<?php

namespace App\UserInterface\Controller\User;

use App\Application\User\DestroyUserUseCase;
use App\Infrastructure\Laravel\Controller;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class DestroyUserController extends Controller
{

    private DestroyUserUseCase $destroyUserUseCase;

    public function __construct(DestroyUserUseCase $destroyUserUseCase) {
        $this->destroyUserUseCase = $destroyUserUseCase;
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(string $id): JsonResponse
    {
        $this->destroyUserUseCase->__invoke($id);

        return Response::json([], JsonResponse::HTTP_NO_CONTENT);
    }
}
