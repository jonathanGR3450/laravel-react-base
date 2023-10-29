<?php

namespace App\Http\Requests\Construccion;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreLocalFormRequest extends FormRequest
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
            'identificador' => 'required|string|max:20',
            'tipo_construccion' => 'nullable|exists:pgsqlcatastro.lc_construcciontipo,t_id',
            'tipo_dominio' => 'nullable|exists:pgsqlcatastro.lc_dominioconstrucciontipo,t_id',
            'numero_pisos' => 'required|integer|min:0|max:300',
            'numero_sotanos' => 'nullable|integer|min:0|max:99',
            'numero_mezanines' => 'nullable|integer|min:0|max:99',
            'numero_semisotanos' => 'nullable|integer|min:0|max:99',
            'anio_construccion' => 'nullable|integer|min:1550|max:2500',
            'avaluo_construccion' => 'nullable|numeric|min:0|max:999999999999999',
            'valor_referencia_construccion' => 'nullable|numeric|min:0|max:999999999999999',
            'area_construccion' => 'required|numeric|min:0|max:99999999999999.9',
            'altura' => 'nullable|numeric|min:0|max:1000',
            'observaciones' => 'nullable|string',
            'dimension' => 'nullable|exists:pgsqlcatastro.col_dimensiontipo,t_id',
            'etiqueta' => 'nullable|string|max:255',
            'relacion_superficie' => 'nullable|exists:pgsqlcatastro.col_relacionsuperficietipo,t_id',
            'nivel' => 'nullable|exists:pgsqlcatastro.lc_nu_nivel,t_id',
            'comienzo_vida_util_version' => 'required|date',
            'fin_vida_util_version' => 'nullable|date',
            'espacio_de_nombres' => 'required|string|max:255',
        ];
    }
}
