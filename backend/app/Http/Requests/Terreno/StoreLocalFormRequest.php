<?php

namespace App\Http\Requests\Terreno;

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
            'area_terreno' => 'required|numeric|between:0,99999999999999.9',
            'avaluo_terreno' => 'nullable|numeric|between:0,999999999999999',
            'manzana_vereda_codigo' => 'nullable|string|max:17',
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
