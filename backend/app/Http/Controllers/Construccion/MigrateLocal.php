<?php

namespace App\Http\Controllers\Construccion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Construccion\MigrateLocalFormRequest;
use App\Http\Resources\Terreno\TerrenoResource;
use App\Models\LcConstruccion;
use App\Models\LcTerreno;
use App\Models\Local\LcConstruccionLocal;
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

            $construccion = LcConstruccionLocal::where('t_id_conservacion', $tidConservacion)
                ->get()
                ->first();

            $construccionData = $construccion->makeHidden(['t_id', 't_id_conservacion', 'comienzo_vida_util_version'])->toArray();
            $lcConstruccion = LcConstruccion::where('t_id', $tidConservacion)->update($construccionData);
            
            return $this->sendResponse($construccion, "lc construccion migrado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
