<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cafificacion\NoConvencionalResource;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NoConvencionalShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, int $id)
    {
        $noConvencional = LcCaracteristicasUnidadConstruccionLocal::findOrFail($id);
        // dd($noConvencional->tipoConstruccion->ilicode);

        if ($noConvencional->tipoConstruccion->ilicode !== 'No_Convencional') {
            return response()->json(['errors' => [
                "Esta unidad de construccion es convencional"
            ]], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        
        $noConvencionalResource = new NoConvencionalResource($noConvencional);

        return response()->json([
            "status" => "successful",
            "message" => "calificaciones no convencionales get successfull",
            "data" => $noConvencionalResource
        ], 200);
    }
}
