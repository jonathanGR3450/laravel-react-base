<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cafificacion\ConvencionalResource;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConvencionalShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, int $id)
    {
        $convecional = LcCaracteristicasUnidadConstruccionLocal::findOrFail($id);
        // dd($convecional->tipoConstruccion->ilicode);

        if ($convecional->tipoConstruccion->ilicode !== 'Convencional') {
            return response()->json(['errors' => [
                "Esta unidad de construccion es no convencional"
            ]], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $convencionalResource = new ConvencionalResource($convecional);

        return response()->json([
            "status" => "successful",
            "message" => "calificacion convencional get successfull",
            "data" => $convencionalResource
        ], 200);
    }
}
