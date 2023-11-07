<?php

namespace App\Http\Controllers\DatosPHCondominio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\DatosPHCondominio\StoreLocalFormRequest;
use App\Http\Resources\DatosPHCondominio\DatosPHCondominioResource;
use App\Models\Local\LcDatosphcondominioLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $condominio = LcDatosphcondominioLocal::create($request->validated());
            
            $condominio = new DatosPHCondominioResource($condominio);
            return $this->sendResponse($condominio, "lc datos ph condominio creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
