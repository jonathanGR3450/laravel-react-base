<?php

namespace App\Http\Requests;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *    schema="ValidarConstruccionesFormRequest",
 *    @OA\Property(
 *      property="construcciones",
 *      type="array",
 *      description="Lista de construcciones",
 *      @OA\Items(
 *          @OA\Property(
 *         property="caracteristicasunidadconstruccion",
 *         type="object",
 *         required={
 *             "identificador",
 *             "tipo_construccion",
 *             "tipo_dominio",
 *             "tipo_unidad_construccion",
 *             "tipo_planta",
 *             "total_plantas",
 *             "total_habitaciones",
 *             "total_banios",
 *             "total_locales",
 *             "anio_construccion",
 *             "uso",
 *             "avaluo_unidad_construccion",
 *             "area_construida",
 *             "area_privada_construida",
 *             "fin_vida_util_version",
 *             "espacio_de_nombres",
 *             "local_id",
 *             "observaciones",
 *             "calificacionconvencional"
 *         },
 *         @OA\Property(
 *             property="identificador",
 *             type="string",
 *             maxLength=20,
 *             description="Identificador de la construcción"
 *         ),
 *         @OA\Property(
 *             property="tipo_construccion",
 *             type="integer",
 *             description="ID del tipo de construcción"
 *         ),
 *         @OA\Property(
 *             property="tipo_dominio",
 *             type="integer",
 *             description="ID del tipo de dominio"
 *         ),
 *         @OA\Property(
 *             property="tipo_unidad_construccion",
 *             type="integer",
 *             description="ID del tipo de unidad de construcción"
 *         ),
 *         @OA\Property(
 *             property="tipo_planta",
 *             type="integer",
 *             description="ID del tipo de planta"
 *         ),
 *         @OA\Property(
 *             property="total_plantas",
 *             type="integer",
 *             description="Total de plantas"
 *         ),
 *         @OA\Property(
 *             property="total_habitaciones",
 *             type="integer",
 *             description="Total de habitaciones"
 *         ),
 *         @OA\Property(
 *             property="total_banios",
 *             type="integer",
 *             description="Total de baños"
 *         ),
 *         @OA\Property(
 *             property="total_locales",
 *             type="integer",
 *             description="Total de locales"
 *         ),
 *         @OA\Property(
 *             property="anio_construccion",
 *             type="integer",
 *             description="Año de construcción"
 *         ),
 *         @OA\Property(
 *             property="uso",
 *             type="integer",
 *             description="ID del tipo de uso de construcción"
 *         ),
 *         @OA\Property(
 *             property="avaluo_unidad_construccion",
 *             type="string",
 *             description="Avalúo de la unidad de construcción"
 *         ),
 *         @OA\Property(
 *             property="area_construida",
 *             type="number",
 *             description="Área construida"
 *         ),
 *         @OA\Property(
 *             property="area_privada_construida",
 *             type="number",
 *             description="Área privada construida"
 *         ),
 *         @OA\Property(
 *             property="fin_vida_util_version",
 *             type="string",
 *             description="Fin de vida útil (versión)"
 *         ),
 *         @OA\Property(
 *             property="espacio_de_nombres",
 *             type="string",
 *             maxLength=255,
 *             description="Espacio de nombres"
 *         ),
 *         @OA\Property(
 *             property="local_id",
 *             type="string",
 *             maxLength=255,
 *             description="ID del local"
 *         ),
 *         @OA\Property(
 *             property="observaciones",
 *             type="string",
 *             description="Observaciones"
 *         ),
 *         @OA\Property(
 *             property="calificacionconvencional",
 *             type="array",
 *             description="Calificación convencional",
 *             @OA\Items(
 *                 type="object",
 *                 required={
 *                     "tipo_calificar",
 *                     "total_calificacion",
 *                     "grupocalificacion"
 *                 },
 *                 properties={
 *                     @OA\Property(
 *                         property="tipo_calificar",
 *                         type="integer",
 *                         description="ID del tipo de calificación"
 *                     ),
 *                     @OA\Property(
 *                         property="total_calificacion",
 *                         type="integer",
 *                         description="Total de calificación"
 *                     ),
 *                     @OA\Property(
 *                         property="grupocalificacion",
 *                         type="array",
 *                         description="Grupo de calificación",
 *                         @OA\Items(
 *                             type="object",
 *                             required={
 *                                 "clase_calificacion",
 *                                 "conservacion",
 *                                 "subtotal",
 *                                 "objetoconstruccion"
 *                             },
 *                             properties={
 *                                 @OA\Property(
 *                                     property="clase_calificacion",
 *                                     type="integer",
 *                                     description="ID de la clase de calificación"
 *                                 ),
 *                                 @OA\Property(
 *                                     property="conservacion",
 *                                     type="integer",
 *                                     description="ID del estado de conservación"
 *                                 ),
 *                                 @OA\Property(
 *                                     property="subtotal",
 *                                     type="integer",
 *                                     description="Subtotal de calificación"
 *                                 ),
 *                                 @OA\Property(
 *                                     property="objetoconstruccion",
 *                                     type="array",
 *                                     description="Objeto de construcción",
 *                                     @OA\Items(
 *                                         type="object",
 *                                         required={
 *                                             "tipo_objeto_construccion",
 *                                             "puntos"
 *                                         },
 *                                         properties={
 *                                             @OA\Property(
 *                                                 property="tipo_objeto_construccion",
 *                                                 type="integer",
 *                                                 description="ID del tipo de objeto de construcción"
 *                                             ),
 *                                             @OA\Property(
 *                                                 property="puntos",
 *                                                 type="integer",
 *                                                 description="Puntos de objeto de construcción"
 *                                             ),
 *                                         },
 *                                     ),
 *                                 ),
 *                             },
 *                         ),
 *                     ),
 *                 },
 *             ),
 *         ),
 *     ),
 *      )
 *     ),
 * )
 */
class ValidarConstruccionesFormRequest extends FormRequest
{

    use ValidationErrorResponseTrait;
    
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules()
    {
        return [
            'construcciones' => 'required|array|min:1',
            'construcciones.*.caracteristicasunidadconstruccion.identificador' => 'required|string|max:20',
            'construcciones.*.caracteristicasunidadconstruccion.tipo_construccion' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_construcciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.tipo_dominio' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_dominioconstrucciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.tipo_unidad_construccion' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_unidadconstrucciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.tipo_planta' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_construccionplantatipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.total_habitaciones' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.caracteristicasunidadconstruccion.total_banios' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.caracteristicasunidadconstruccion.total_locales' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.caracteristicasunidadconstruccion.total_plantas' => 'nullable|integer|min:0|max:150',
            'construcciones.*.caracteristicasunidadconstruccion.uso' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_usouconstipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.anio_construccion' => 'nullable|integer|min:1512|max:2500',
            'construcciones.*.caracteristicasunidadconstruccion.avaluo_unidad_construccion' => 'nullable|numeric|min:0|max:999999999999999',
            'construcciones.*.caracteristicasunidadconstruccion.area_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'construcciones.*.caracteristicasunidadconstruccion.area_privada_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'construcciones.*.caracteristicasunidadconstruccion.fin_vida_util_version' => 'nullable|date',
            'construcciones.*.caracteristicasunidadconstruccion.espacio_de_nombres' => 'required|string|max:255',
            'construcciones.*.caracteristicasunidadconstruccion.local_id' => 'required|string|max:255',
            'construcciones.*.caracteristicasunidadconstruccion.observaciones' => 'nullable|string',
        
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional' => 'required|array|min:1',
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.tipo_calificar' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_calificartipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.total_calificacion' => 'required|integer|min:0|max:999999999',

            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.grupocalificacion' => 'nullable|array|min:1',
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.grupocalificacion.*.clase_calificacion' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_clasecalificaciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.grupocalificacion.*.conservacion' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_estadoconservaciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.grupocalificacion.*.subtotal' => 'required|integer|min:0|max:9999999',

            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.grupocalificacion.*.objetoconstruccion' => 'nullable|array|min:1',
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.grupocalificacion.*.objetoconstruccion.*.tipo_objeto_construccion' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_objetoconstrucciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.calificacionconvencional.*.grupocalificacion.*.objetoconstruccion.*.puntos' => 'required|integer|min:0|max:34',
        ];
    }
}
