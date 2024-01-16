<?php

namespace App\Http\Requests\ExtDireccion;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *    schema="StoreFormRequest",
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
class StoreFormRequest extends FormRequest
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
            't_seq' => 'nullable|integer',
            'tipo_direccion' => 'required|integer|exists:pgsqlcatastro.extdireccion_tipo_direccion,t_id',
            'es_direccion_principal' => 'required|boolean',
            'codigo_postal' => 'nullable|string|max:255',
            'clase_via_principal' => 'nullable|integer|exists:pgsqlcatastro.extdireccion_clase_via_principal,t_id',
            'valor_via_principal' => 'nullable|string|max:100',
            'letra_via_principal' => 'nullable|string|max:20',
            'sector_ciudad' => 'nullable|integer|exists:pgsqlcatastro.extdireccion_sector_ciudad,t_id',
            'valor_via_generadora' => 'nullable|string|max:100',
            'letra_via_generadora' => 'nullable|string|max:20',
            'numero_predio' => 'nullable|string|max:20',
            'sector_predio' => 'nullable|integer|exists:pgsqlcatastro.extdireccion_sector_predio,t_id',
            'complemento' => 'nullable|string|max:255',
            'nombre_predio' => 'nullable|string|max:255',
            'extunidadedificcnfsica_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.extunidadedificacionfisica,t_id',
            'extinteresado_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.extinteresado,t_id',
            'lc_construccion_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_construccion,t_id',
            'lc_nu_spcjrdcrdsrvcios_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_nu_espaciojuridicoredservicios,t_id',
            'lc_n_spcjrdcndddfccion_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_nu_espaciojuridicounidadedificacion,t_id',
            'lc_terreno_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_terreno,t_id',
            'lc_unidadconstruccion_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_unidadconstruccion,t_id',
            'lc_predio_direccion' => 'nullable|integer|exists:pgsqlcatastro.lc_predio,t_id',
            'lc_servidumbretransito_ext_direccion_id' => 'nullable|integer|exists:pgsqlcatastro.lc_servidumbretransito,t_id',
            'lc_numeros_prediales_id' => 'nullable|integer|exists:lc_numeros_prediales,t_id',
            't_id_conservacion' => 'nullable|integer|exists:pgsqlcatastro.extdireccion,t_id',
        ];
    }
}
