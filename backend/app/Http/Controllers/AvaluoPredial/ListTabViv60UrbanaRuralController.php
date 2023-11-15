<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\TabViv60UrbanaRuralLocalFormRequest;
use App\Http\Resources\AvaluoPredial\TabViv60UrbanaRuralCollection;
use App\Models\Local\TabViv60UrbanaRuralLocal;

class ListTabViv60UrbanaRuralController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(TabViv60UrbanaRuralLocalFormRequest $request)
    {
        try {

            // filters
            $puntos = $request->input('puntos');
            $tipo = $request->input('tipo');
            $vigencia = $request->input('vigencia');

            $query = TabViv60UrbanaRuralLocal::when($puntos, function ($query, $puntos) {
                $query->where('puntos', $puntos);
            })->when($tipo, function ($query, $tipo) {
                $query->where('tipo', $tipo);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->get();
    
            $valorTerreno = new TabViv60UrbanaRuralCollection($query);
            return $this->sendResponse($valorTerreno, "valor terrreno urbano get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
