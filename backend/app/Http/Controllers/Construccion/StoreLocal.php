<?php

namespace App\Http\Controllers\Construccion;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Construccion\StoreLocalFormRequest;
use App\Http\Resources\Construccion\ConstruccionResource;
use App\Models\Local\LcConstruccionLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $construccion = LcConstruccionLocal::create($request->validated());
            
            $construccion = new ConstruccionResource($construccion);
            return $this->sendResponse($construccion, "lc construccion creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
