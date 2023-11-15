<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\TabCom60UrbanaRuralLocalFormRequest;
use App\Http\Resources\AvaluoPredial\TabSantaMariaDeLosAngelesUrbanaLocalCollection;
use App\Models\Local\TabCom60UrbanaRuralLocal;
use App\Models\Local\TabSantaMariaDeLosAngelesUrbanaLocal;

class ListTabCom60UrbanaRuralLocalController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(TabCom60UrbanaRuralLocalFormRequest $request)
    {
        try {

            // filters
            $puntos = $request->input('puntos');
            $vigencia = $request->input('vigencia');
            $tipo = $request->input('tipo');

            $query = TabCom60UrbanaRuralLocal::when($puntos, function ($query, $puntos) {
                $query->where('puntos', $puntos);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->when($tipo, function ($query, $tipo) {
                $query->where('tipo', $tipo);
            })->get();
    
            $valorTerreno = new TabSantaMariaDeLosAngelesUrbanaLocalCollection($query);
            return $this->sendResponse($valorTerreno, "valor tab com urbano get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
