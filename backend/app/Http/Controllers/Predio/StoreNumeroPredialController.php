<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\StoreNumerosPredialesFormRequest;
use App\Models\Local\LcNumerosPredialLocal;

class StoreNumeroPredialController extends AppBaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreNumerosPredialesFormRequest $request)
    {
        try {
            $numerosPrediales = $request->input('numeros_prediales', []);
            foreach ($numerosPrediales as $numeroPredial) {
                LcNumerosPredialLocal::create([
                    'numero_predial' => $numeroPredial
                ]);
            }
            return $this->sendSuccess('Numeros Prediales store successful');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
