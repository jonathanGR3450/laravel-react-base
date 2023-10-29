<?php

namespace App\Http\Controllers\Derecho;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Derecho\StoreLocalFormRequest;
use App\Http\Resources\Derecho\DerechoResource;
use App\Models\Local\LcDerechoLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $derecho = LcDerechoLocal::create($request->validated());
            
            $derecho = new DerechoResource($derecho);
            return $this->sendResponse($derecho, "lc derecho creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
