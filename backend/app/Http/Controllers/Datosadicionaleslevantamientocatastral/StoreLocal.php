<?php

namespace App\Http\Controllers\Datosadicionaleslevantamientocatastral;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Datosadicionaleslevantamientocatastral\StoreLocalFormRequest;
use App\Http\Resources\Datosadicionaleslevantamientocatastral\DatosadicionaleslevantamientocatastralResource;
use App\Models\Local\LcDatosadicionaleslevantamientocatastralLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $datosAdicionales = LcDatosadicionaleslevantamientocatastralLocal::create($request->validated());
            
            $datosAdicionales = new DatosadicionaleslevantamientocatastralResource($datosAdicionales);
            return $this->sendResponse($datosAdicionales, "lc datos adicionales fuente administrativa creada correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
