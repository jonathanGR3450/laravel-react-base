<?php

namespace App\Http\Controllers\AvaluoPredial;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\AvaluoPredial\LcValorTerrenoUrbanaLocalFormRequest;
use App\Http\Resources\AvaluoPredial\AvaluoPredialCollection;
use App\Models\Local\LcValorTerrenoUrbanaLocal;

class ListValorTerrenoUrbanoController extends AppBaseController
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(LcValorTerrenoUrbanaLocalFormRequest $request)
    {
        try {

            // filters
            $zhgNo = $request->input('zhg_no');
            $vigencia = $request->input('vigencia');

            $query = LcValorTerrenoUrbanaLocal::when($zhgNo, function ($query, $zhgNo) {
                $query->where('zhg_no', $zhgNo);
            })->when($vigencia, function ($query, $vigencia) {
                $query->where('vigencia', $vigencia);
            })->get();
    
            $valorTerreno = new AvaluoPredialCollection($query);
            return $this->sendResponse($valorTerreno, "valor terrreno urbano get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
