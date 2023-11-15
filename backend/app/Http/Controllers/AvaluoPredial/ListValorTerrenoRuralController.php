<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\LcValorTerrenoRuralLocalFormRequest;
use App\Http\Requests\AvaluoPredial\LcValorTerrenoUrbanaLocalFormRequest;
use App\Http\Resources\AvaluoPredial\AvaluoPredialCollection;
use App\Http\Resources\AvaluoPredial\LcValorTerrenoRuralLocalCollection;
use App\Models\Local\LcValorTerrenoRuralLocal;
use App\Models\Local\LcValorTerrenoUrbanaLocal;

class ListValorTerrenoRuralController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(LcValorTerrenoRuralLocalFormRequest $request)
    {
        try {

            // filters
            $zonaEconomica = $request->input('zona_economica');
            $vigencia = $request->input('vigencia');

            $query = LcValorTerrenoRuralLocal::when($zonaEconomica, function ($query, $zonaEconomica) {
                $query->where('zona_economica', $zonaEconomica);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->get();
    
            $valorTerreno = new LcValorTerrenoRuralLocalCollection($query);
            return $this->sendResponse($valorTerreno, "valor terrreno rural get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
