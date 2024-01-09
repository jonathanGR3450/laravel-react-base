<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CaracteristicasUnidadConstruccion\StoreLocalFormRequest;
use App\Http\Resources\Terreno\TerrenoResource;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use App\Models\Local\LcTerrenoLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $data = $request->validated();
            $data['comienzo_vida_util_version'] = date('Y-m-d H:i:s');
            $caracteristica = LcCaracteristicasUnidadConstruccionLocal::create($data);
            
            return $this->sendResponse($caracteristica, "lc caracteristica creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
