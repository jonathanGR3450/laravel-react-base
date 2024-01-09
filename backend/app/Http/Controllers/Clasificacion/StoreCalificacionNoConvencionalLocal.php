<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CaracteristicasUnidadConstruccion\StoreCalificacionNoConvencionalLocalFormRequest;
use App\Models\LcCalificacionConvencional;
use App\Models\Local\LcCalificacionConvencionalLocal;
use App\Models\Local\LcCalificacionNoConvencionalLocal;

class StoreCalificacionNoConvencionalLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreCalificacionNoConvencionalLocalFormRequest $request, int $id)
    {
        try {
            // dd($request->validated());
            $calificacion = LcCalificacionNoConvencionalLocal::where('t_id', $id)->update($request->validated());
            
            return $this->sendResponse($calificacion, "lc calificacion no convencional actualizado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
