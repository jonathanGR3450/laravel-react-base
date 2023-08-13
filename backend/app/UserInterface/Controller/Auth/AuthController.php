<?php

namespace App\UserInterface\Controller\Auth;

use App\Application\Auth\Contracts\AuthUserInterface;
use App\Infrastructure\Laravel\Controller;
use App\UserInterface\Requests\Auth\LoginFormRequest;
use App\UserInterface\Requests\Auth\RegisterFormRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\UnauthorizedException;

class AuthController extends Controller
{
    private AuthUserInterface $authUserInterface;
    public function __construct(AuthUserInterface $authUserInterface)
    {
        $this->middleware('jwt.verify', ['except' => ['login','register']]);
        $this->authUserInterface = $authUserInterface;
    }

    public function login(LoginFormRequest $request)
    {
        try {
            $token = $this->authUserInterface->loginCredentials($request->input('email'), $request->input('password'));
            $user = $this->authUserInterface->getAuthUserAgreggate();
            return response()->json([
                'status' => 'success',
                'message' => 'User logged successfully',
                'user' => $user->asArray(),
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ], 200);
        } catch (UnauthorizedException $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], empty($e->getCode()) ? 500 : $e->getCode());
        }
    }


    public function register(RegisterFormRequest $request)
    {
        // dd($request->all(), $request->input('last_name'));
        $user = $this->authUserInterface->createUser(
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
        $token = $this->authUserInterface->loginUserModel($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user->asArray(),
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ], JsonResponse::HTTP_CREATED);
    }

    public function logout()
    {
        $this->authUserInterface->logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function getAuthenticatedUser()
    {
        $user = $this->authUserInterface->getAuthUser();
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Get user Logged successful',
                'data' => $user
            ]);
    }

    public function refresh()
    {
        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Successfully refresh token',
                'user' => $this->authUserInterface->getAuthenticatedUser(),
                'authorization' => [
                    'token' => $this->authUserInterface->refresh(),
                    'type' => 'bearer',
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }
    }
}
