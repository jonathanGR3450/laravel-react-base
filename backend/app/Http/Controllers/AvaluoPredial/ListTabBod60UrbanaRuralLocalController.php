<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\TabBod60UrbanaRuralLocalFormRequest;
use App\Http\Requests\AvaluoPredial\TabCom60UrbanaRuralLocalFormRequest;
use App\Http\Resources\AvaluoPredial\TabBod60UrbanaRuralLocalCollection;
use App\Http\Resources\AvaluoPredial\TabSantaMariaDeLosAngelesUrbanaLocalCollection;
use App\Models\Local\TabBod60UrbanaRuralLocal;
use App\Models\Local\TabCom60UrbanaRuralLocal;
use App\Models\Local\TabSantaMariaDeLosAngelesUrbanaLocal;

class ListTabBod60UrbanaRuralLocalController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(TabBod60UrbanaRuralLocalFormRequest $request)
    {
        try {

            // filters
            $puntos = $request->input('puntos');
            $vigencia = $request->input('vigencia');
            $tipo = $request->input('tipo');

            $query = TabBod60UrbanaRuralLocal::when($puntos, function ($query, $puntos) {
                $query->where('puntos', $puntos);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->when($tipo, function ($query, $tipo) {
                $query->where('tipo', $tipo);
            })->get();
    
            $valorTerreno = new TabBod60UrbanaRuralLocalCollection($query);
            return $this->sendResponse($valorTerreno, "valor tab bod urbano get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
