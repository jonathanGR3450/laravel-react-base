<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cafificacion\NoConvencionalCollection;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use App\Traits\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoConvencionalIndexController extends Controller
{

    use PaginationTrait;

    /**
     * @OA\Get(
     *     path="/api/v1/caracteristicasunidadconstruccion/no-convencional",
     *     summary="Obtener información de contrucciones no convencionales",
     *     tags={"Construccion"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Información de la construccion no convencional",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de la respuesta"),
     *             @OA\Property(property="data", type="array", description="Datos de la construccion", @OA\Items(
     *                  ref="#/components/schemas/NoConvencionalCollection"
     *              )),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de error"),
     *         ),
     *     ),
     * )
     */
    public function __invoke(Request $request)
    {
        $query = LcCaracteristicasUnidadConstruccionLocal::whereExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('lc_calificacionnoconvencional')
                ->whereColumn('lc_calificacionnoconvencional.lc_unidad_construccion', 'lc_caracteristicasunidadconstruccion.t_id');
        });

        /**pagination */
        $sortable = [
            'name'    => 'first_name',
        ];

        $query = $this->paginationQuery($query, $sortable, $request);
        
        $noConvencionalesCollection = new NoConvencionalCollection($query);

        return response()->json([
            "status" => "successful",
            "message" => "calificaciones no convencionales get successfull",
            "data" => $noConvencionalesCollection
        ], 200);
    }
}
