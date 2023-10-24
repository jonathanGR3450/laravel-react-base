<?php

namespace App\Http\Controllers\Terreno;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Terreno\StoreLocalFormRequest;
use App\Http\Resources\Terreno\TerrenoResource;
use App\Models\Local\LcTerrenoLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $terreno = LcTerrenoLocal::create($request->validated());
            
            $terreno = new TerrenoResource($terreno);
            return $this->sendResponse($terreno, "lc terreno creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
