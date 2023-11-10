<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\TabSantaMariaDeLosAngelesUrbanaLocalFormRequest;
use App\Http\Resources\AvaluoPredial\TabSantaMariaDeLosAngelesUrbanaLocalCollection;
use App\Http\Resources\AvaluoPredial\TabViv60UrbanaRuralCollection;
use App\Models\Local\TabSantaMariaDeLosAngelesUrbanaLocal;
use App\Models\Local\TabViv60UrbanaRuralLocal;

class ListTabSantaMariaDeLosAngelesUrbanaLocalController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(TabSantaMariaDeLosAngelesUrbanaLocalFormRequest $request)
    {
        try {

            // filters
            $puntos = $request->input('puntos');
            $vigencia = $request->input('vigencia');

            $query = TabSantaMariaDeLosAngelesUrbanaLocal::when($puntos, function ($query, $puntos) {
                $query->where('puntos', $puntos);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->get();
    
            $valorTerreno = new TabSantaMariaDeLosAngelesUrbanaLocalCollection($query);
            return $this->sendResponse($valorTerreno, "valor tab santa maria urbano get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
