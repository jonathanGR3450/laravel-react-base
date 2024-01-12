<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CaracteristicasUnidadConstruccion\MigrateLocalFormRequest;
use App\Http\Resources\Terreno\TerrenoResource;
use App\Models\LcCaracteristicasUnidadConstruccion;
use App\Models\LcTerreno;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use App\Models\Local\LcTerrenoLocal;
use Illuminate\Support\Facades\DB;

class MigrateLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MigrateLocalFormRequest $request)
    {
        try {
            $tidConservacion = $request->input('t_id_conservacion');

            $caracteristica = LcCaracteristicasUnidadConstruccionLocal::where('t_id_conservacion', $tidConservacion)
                ->get()
                ->first();

            $caracteristicaData = $caracteristica->makeHidden(['t_id', 't_id_conservacion', 'comienzo_vida_util_version', 'sync'])->toArray();
            LcCaracteristicasUnidadConstruccion::where('t_id', $tidConservacion)->update($caracteristicaData);
            
            $caracteristica = new TerrenoResource($caracteristica);
            return $this->sendResponse($caracteristica, "lc caracteristica migrado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
