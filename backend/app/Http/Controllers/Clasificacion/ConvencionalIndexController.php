<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\Cafificacion\ConvencionalCollection;
use App\Models\Local\LcCaracteristicasUnidadConstruccionLocal;
use App\Traits\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConvencionalIndexController extends AppBaseController
{

    use PaginationTrait;
    
    /**
     * @OA\Get(
     *     path="/api/v1/caracteristicasunidadconstruccion/convencional",
     *     summary="Obtener información de contrucciones convencionales",
     *     tags={"Construccion"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Información de la construccion convencional",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de la respuesta"),
     *             @OA\Property(property="data", type="array", description="Datos de la construccion", @OA\Items(
     *                  ref="#/components/schemas/ConvencionalCollection"
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
        try {
            $query = LcCaracteristicasUnidadConstruccionLocal::whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('lc_calificacionconvencional')
                    ->whereColumn('lc_calificacionconvencional.lc_unidad_construccion', 'lc_caracteristicasunidadconstruccion.t_id');
            });
            
            /**pagination */
            $sortable = [
                'name'    => 'first_name',
            ];
    
            $query = $this->paginationQuery($query, $sortable, $request);
            $convencionalesCollection = new ConvencionalCollection($query);
            return $this->sendResponse($convencionalesCollection, "calificaciones convencionales get successfull");
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
