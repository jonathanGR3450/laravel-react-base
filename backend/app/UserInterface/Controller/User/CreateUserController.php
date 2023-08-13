<?php

namespace App\UserInterface\Controller\User;

use App\Application\User\CreateUserUseCase;
use App\Infrastructure\Laravel\Controller;
use App\UserInterface\Requests\Auth\RegisterFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class CreateUserController extends Controller
{
    private CreateUserUseCase $createUserUsercase;

    public function __construct(CreateUserUseCase $createUserUsercase) {
        $this->createUserUsercase = $createUserUsercase;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(RegisterFormRequest $request)
    {
        $user = $this->createUserUsercase->__invoke(
            $request->input('name'),
            $request->input('last_name'),
            $request->input('email'),
            $request->input('identification'),
            $request->input('cell_phone'),
            $request->input('city'),
            $request->input('address'),
            $request->input('city_register'),
            (bool) $request->input('is_manager'),
            (bool) $request->input('is_signer'),
            $request->input('is_verified'),
            $request->input('password')
        );

        return Response::json([
            'data' => $user->asArray()
        ], JsonResponse::HTTP_CREATED);
    }
}
