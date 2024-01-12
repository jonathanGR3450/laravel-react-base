<?php

namespace App\Http\Controllers\Terreno;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Terreno\MigrateLocalFormRequest;
use App\Http\Resources\Terreno\TerrenoResource;
use App\Models\LcTerreno;
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

            $terreno = LcTerrenoLocal::where('t_id_conservacion', $tidConservacion)
                ->get()
                ->first();

            $terrenoData = $terreno->makeHidden(['t_id', 't_id_conservacion', 'comienzo_vida_util_version'])->toArray();
            $lcTerreno = LcTerreno::where('t_id', $tidConservacion)->update($terrenoData);
            
            $terreno = new TerrenoResource($terreno);
            return $this->sendResponse($terreno, "lc terreno migrado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
