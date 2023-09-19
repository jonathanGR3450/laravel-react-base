<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cafificacion\NoConvencionalCollection;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoConvencionalIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $noConvencionales = LcCaracteristicasUnidadConstruccionLocal::whereExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('lc_calificacionnoconvencional')
                ->whereColumn('lc_calificacionnoconvencional.lc_unidad_construccion', 'lc_caracteristicasunidadconstruccion.t_id');
        })
        ->get();
        
        $noConvencionalesCollection = new NoConvencionalCollection($noConvencionales);

        return response()->json([
            "status" => "successful",
            "message" => "calificaciones no convencionales get successfull",
            "data" => $noConvencionalesCollection
        ], 200);
    }
}
