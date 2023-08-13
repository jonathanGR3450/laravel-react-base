<?php

namespace App\Infrastructure\Laravel\Middleware;

use Closure;
use Exception;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{

    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['status' => 'error', 'message' => 'Token is Invalid'], JsonResponse::HTTP_UNAUTHORIZED);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['status' => 'error', 'message' => 'Token is Expired'], JsonResponse::HTTP_UNAUTHORIZED);
            }else{
                return response()->json(['status' => 'error', 'message' => 'Authorization Token not found'], JsonResponse::HTTP_UNAUTHORIZED);
            }
        }
        return $next($request);
    }
}
