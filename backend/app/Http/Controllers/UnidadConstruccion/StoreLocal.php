<?php

namespace App\Http\Controllers\UnidadConstruccion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\UnidadConstruccion\StoreLocalFormRequest;
use App\Http\Resources\UnidadConstruccion\UnidadConstruccionResource;
use App\Models\Local\LcUnidadconstruccionLocal;
use Exception;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {

            if (!$request->input('lc_construccion') && !$request->input('lc_construccion_conservacion')) {
                throw new Exception("lc_construccion o lc_construccion_conservacion es requerido");
            }

            $unidadContruccion = LcUnidadconstruccionLocal::create($request->validated());
            
            $unidadContruccion = new UnidadConstruccionResource($unidadContruccion);
            return $this->sendResponse($unidadContruccion, "lc unidad construccion creada correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
