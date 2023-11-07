<?php

namespace App\Http\Controllers\Clasificacion;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoConvencional\IndexRequest;
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
    public function __invoke(IndexRequest $request)
    {
        // filters
        $construccion = $request->input('tipo_construccion');
        $dominio = $request->input('tipo_dominio');
        $unidadConstruccion = $request->input('tipo_unidad_construccion');
        $tipoPlanta = $request->input('tipo_planta');
        $uso = $request->input('uso');

        $totalHabitaciones = $request->input('total_habitaciones');
        $totalBanios = $request->input('total_banios');
        $totalLocales = $request->input('total_locales');
        $totalPlantas = $request->input('total_plantas');
    
        $query = LcCaracteristicasUnidadConstruccionLocal::whereExists(function ($query) {
            $query->select(DB::raw(1))
                ->from('lc_calificacionnoconvencional')
                ->whereColumn('lc_calificacionnoconvencional.lc_unidad_construccion', 'lc_caracteristicasunidadconstruccion.t_id');
        })
        ->when($totalHabitaciones, function ($query, $totalHabitaciones) {
            $query->where('total_habitaciones', $totalHabitaciones);
        })->when($totalBanios, function ($query, $totalBanios) {
            $query->where('total_banios', $totalBanios);
        })->when($totalLocales, function ($query, $totalLocales) {
            $query->where('total_locales', $totalLocales);
        })->when($totalPlantas, function ($query, $totalPlantas) {
            $query->where('total_plantas', $totalPlantas);
        })->when($construccion, function ($query, $construccion) {
            $query->where('tipo_construccion', $construccion);
        })->when($dominio, function ($query, $dominio) {
            $query->where('tipo_dominio', $dominio);
        })->when($unidadConstruccion, function ($query, $unidadConstruccion) {
            $query->where('tipo_unidad_construccion', $unidadConstruccion);
        })->when($tipoPlanta, function ($query, $tipoPlanta) {
            $query->where('tipo_planta', $tipoPlanta);
        })->when($uso, function ($query, $uso) {
            $query->where('uso', $uso);
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
