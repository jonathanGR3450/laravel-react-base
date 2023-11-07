<?php

namespace App\Http\Controllers\RicPredio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\RicPredio\StoreLocalFormRequest;
use App\Http\Resources\RicPredio\RicPredioResource;
use App\Models\Local\RicPredioLocal;

class StoreLocal extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreLocalFormRequest $request)
    {
        try {
            $ricPredio = RicPredioLocal::create($request->validated());
            
            $ricPredio = new RicPredioResource($ricPredio);
            return $this->sendResponse($ricPredio, "lc ric predio creado correctamente");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
