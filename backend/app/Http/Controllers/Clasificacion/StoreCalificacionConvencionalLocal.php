<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CaracteristicasUnidadConstruccion\StoreCalificacionConvencionalLocalFormRequest;
use App\Models\LcCalificacionConvencional;
use App\Models\Local\LcCalificacionConvencionalLocal;

class StoreCalificacionConvencionalLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreCalificacionConvencionalLocalFormRequest $request, int $id)
    {
        try {
            // dd($request->validated());
            $calificacion = LcCalificacionConvencionalLocal::where('t_id', $id)->update($request->validated());
            
            return $this->sendResponse($calificacion, "lc calificacion actualizado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
