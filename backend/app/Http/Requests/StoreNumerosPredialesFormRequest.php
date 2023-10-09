<?php

namespace App\Http\Requests;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *    schema="StoreNumerosPredialesFormRequest",
 *    @OA\Property(
 *        property="numeros_prediales",
 *        type="array",
 *        @OA\Items(
 *            type="string"
 *        ),
 *        description="Array de numeros prediales",
 *        nullable=false,
 *    ),
 * )
 */
class StoreNumerosPredialesFormRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'numeros_prediales' => 'required|array|min:1',
            'numeros_prediales.*.numero_predial' => 'required|unique:lc_numeros_prediales,numero_predial',
            'numeros_prediales.*.matricula_inmobiliaria' => 'required|unique:lc_numeros_prediales,matricula_inmobiliaria',
            'numeros_prediales.*.extdireccion' => 'required|array',
            'numeros_prediales.*.extdireccion.t_seq' => 'nullable|integer',
            'numeros_prediales.*.extdireccion.tipo_direccion' => 'required|integer|exists:pgsqlcatastro.extdireccion_tipo_direccion,t_id',
            'numeros_prediales.*.extdireccion.es_direccion_principal' => 'required|boolean',
            'numeros_prediales.*.extdireccion.codigo_postal' => 'nullable|string|max:255',
            'numeros_prediales.*.extdireccion.clase_via_principal' => 'nullable|integer|exists:pgsqlcatastro.extdireccion_clase_via_principal,t_id',
            'numeros_prediales.*.extdireccion.valor_via_principal' => 'nullable|string|max:100',
            'numeros_prediales.*.extdireccion.letra_via_principal' => 'nullable|string|max:20',
            'numeros_prediales.*.extdireccion.sector_ciudad' => 'nullable|integer|exists:pgsqlcatastro.extdireccion_sector_ciudad,t_id',
            'numeros_prediales.*.extdireccion.valor_via_generadora' => 'nullable|string|max:100',
            'numeros_prediales.*.extdireccion.letra_via_generadora' => 'nullable|string|max:20',
            'numeros_prediales.*.extdireccion.numero_predio' => 'nullable|string|max:20',
            'numeros_prediales.*.extdireccion.sector_predio' => 'nullable|integer|exists:pgsqlcatastro.extdireccion_sector_predio,t_id',
            'numeros_prediales.*.extdireccion.complemento' => 'nullable|string|max:255',
            'numeros_prediales.*.extdireccion.nombre_predio' => 'nullable|string|max:255',
            'numeros_prediales.*.extdireccion.extunidadedificcnfsica_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.extunidadedificacionfisica,t_id',
            'numeros_prediales.*.extdireccion.extinteresado_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.extinteresado,t_id',
            'numeros_prediales.*.extdireccion.lc_construccion_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_construccion,t_id',
            'numeros_prediales.*.extdireccion.lc_nu_spcjrdcrdsrvcios_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_nu_espaciojuridicoredservicios,t_id',
            'numeros_prediales.*.extdireccion.lc_n_spcjrdcndddfccion_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_nu_espaciojuridicounidadedificacion,t_id',
            'numeros_prediales.*.extdireccion.lc_terreno_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_terreno,t_id',
            'numeros_prediales.*.extdireccion.lc_unidadconstruccion_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_unidadconstruccion,t_id',
            'numeros_prediales.*.extdireccion.lc_predio_direccion' => 'nullable|integer|exists:pgsqlcatastro.lc_predio,t_id',
            'numeros_prediales.*.extdireccion.lc_servidumbretransito_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_servidumbretransito,t_id',
        ];
    }
}
