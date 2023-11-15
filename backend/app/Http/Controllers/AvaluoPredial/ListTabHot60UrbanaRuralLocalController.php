<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\TabHot60UrbanaRuralLocalFormRequest;
use App\Http\Resources\AvaluoPredial\TabHot60UrbanaRuralLocalCollection;
use App\Models\Local\TabHot60UrbanaRuralLocal;

class ListTabHot60UrbanaRuralLocalController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(TabHot60UrbanaRuralLocalFormRequest $request)
    {
        try {

            // filters
            $puntos = $request->input('puntos');
            $vigencia = $request->input('vigencia');
            $tipo = $request->input('tipo');

            $query = TabHot60UrbanaRuralLocal::when($puntos, function ($query, $puntos) {
                $query->where('puntos', $puntos);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->when($tipo, function ($query, $tipo) {
                $query->where('tipo', $tipo);
            })->get();
    
            $valorTerreno = new TabHot60UrbanaRuralLocalCollection($query);
            return $this->sendResponse($valorTerreno, "valor tab hot urbano get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
