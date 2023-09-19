<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cafificacion\ConvencionalCollection;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConvencionalIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $convencionales = LcCaracteristicasUnidadConstruccionLocal::whereExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('lc_calificacionconvencional')
                ->whereColumn('lc_calificacionconvencional.lc_unidad_construccion', 'lc_caracteristicasunidadconstruccion.t_id');
        })
        ->get();
        // dd($convencionales);
        $convencionalesCollection = new ConvencionalCollection($convencionales);

        return response()->json([
            "status" => "successful",
            "message" => "calificaciones convencionales get successfull",
            "data" => $convencionalesCollection
        ], 200);
    }
}
