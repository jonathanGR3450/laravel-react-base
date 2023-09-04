<?php

namespace App\Http\Controllers;

use App\Http\Resources\Predio\PredioResource;
use App\Models\LcPredio;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;

class GetPredioController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(int $id)
    {
        try {
            $predio = LcPredio::findOrFail($id);

            // dd($predio->numero_predial);

            $predioResource = new PredioResource($predio);
            return response()->json([
                "status" => "successful",
                "message" => "Predio get successfull",
                "data" => $predioResource
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage()
            ], 400, []);
        }
        
    }
}
