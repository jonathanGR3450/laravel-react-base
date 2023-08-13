<?php

declare(strict_types=1);

namespace App\Application\Auth;

use App\Application\Auth\Contracts\AuthUserInterface;
use App\Application\User\CreateUserUseCase;
use App\Domain\User\Aggregate\User;
use App\Domain\User\UserRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

final class AuthUser implements AuthUserInterface
{
    private UserRepositoryInterface $userRepositoryInterface;
    private CreateUserUseCase $createUserUseCase;

    public function __construct(UserRepositoryInterface $userRepositoryInterface, CreateUserUseCase $createUserUseCase) {
        $this->userRepositoryInterface = $userRepositoryInterface;
        $this->createUserUseCase = $createUserUseCase;
    }
    
    public function loginCredentials(string $email, string $password): string
    {
        $credentials = compact('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                throw new UnauthorizedException('invalid_credentials');
            }
        } catch (JWTException $e) {
            throw new UnauthorizedException('could_not_create_token');
        }
        return $token;
    }

    public function loginUserModel(User $user): string
    {
        $user = $this->userRepositoryInterface->findByIdGetModel($user->id());
        $token = JWTAuth::fromUser($user);
        return $token;
    }

    public function getAuthUser(): \Illuminate\Contracts\Auth\Authenticatable
    {
        return Auth::user();
    }

    public function getAuthUserAgreggate(): User|bool
    {
        return $this->userRepositoryInterface->getAuthUser();
    }

    public function createUser(
        string $name,
        string $last_name,
        string $email,
        int $identification,
        int $cell_phone,
        string $city,
        string $address,
        string $city_register,
        bool $is_manager,
        bool $is_signer,
        ?string $is_verified,
        string $password,
    ): User
    {
        $user = $this->createUserUseCase->__invoke(
            $name,
            $last_name,
            $email,
            $identification,
            $cell_phone,
            $city,
            $address,
            $city_register,
            $is_manager,
            $is_signer,
            $is_verified,
            $password,
        );
        return $user;
    }

    public function logout(): void
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    public function refresh(): string
    {
        return JWTAuth::refresh();
    }

    public function getAuthenticatedUser(): \Illuminate\Contracts\Auth\Authenticatable
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                throw new Exception('User Not found', JsonResponse::HTTP_UNAUTHORIZED);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            throw new Exception('Token Expired', JsonResponse::HTTP_UNAUTHORIZED);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            throw new Exception('Token Invalid', JsonResponse::HTTP_UNAUTHORIZED);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            throw new Exception('Token Absent', JsonResponse::HTTP_UNAUTHORIZED);
        }
        return $user;
    }

}
