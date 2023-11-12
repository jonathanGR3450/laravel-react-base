<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\TabCcF0360UrbanaRuralLocalFormRequest;
use App\Http\Requests\AvaluoPredial\TabHot60UrbanaRuralLocalFormRequest;
use App\Http\Resources\AvaluoPredial\TabCcF0360UrbanaRuralLocalCollection;
use App\Http\Resources\AvaluoPredial\TabHot60UrbanaRuralLocalCollection;
use App\Models\Local\TabCcF0360UrbanaRuralLocal;
use App\Models\Local\TabHot60UrbanaRuralLocal;

class ListTabCcF0360UrbanaRuralLocalController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(TabCcF0360UrbanaRuralLocalFormRequest $request)
    {
        try {

            // filters
            $puntos = $request->input('puntos');
            $vigencia = $request->input('vigencia');
            $tipo = $request->input('tipo');

            $query = TabCcF0360UrbanaRuralLocal::when($puntos, function ($query, $puntos) {
                $query->where('puntos', $puntos);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->when($tipo, function ($query, $tipo) {
                $query->where('tipo', $tipo);
            })->get();
    
            $valorTerreno = new TabCcF0360UrbanaRuralLocalCollection($query);
            return $this->sendResponse($valorTerreno, "valor tab cc f03 urbano get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
