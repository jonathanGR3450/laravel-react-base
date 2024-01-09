<?php

namespace App\Http\Requests\UnidadConstruccion;

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
            'planta_ubicacion' => 'required|integer|min:0|max:300',
            'area_construida' => 'required|numeric|min:0|max:99999999999999.9',
            'altura' => 'nullable|integer|min:1|max:1000',
            'lc_caracteristicasunidadconstruccion' => 'nullable|integer|exists:lc_caracteristicasunidadconstruccion,t_id',
            'lc_construccion' => 'nullable|integer|exists:lc_construccion,t_id',
            'lc_construccion_conservacion' => 'nullable|integer|exists:pgsqlcatastro.lc_construccion,t_id',
            'dimension' => 'nullable|integer|exists:pgsqlcatastro.col_dimensiontipo,t_id',
            'etiqueta' => 'nullable|string|max:255',
            'relacion_superficie' => 'nullable|integer|exists:pgsqlcatastro.col_relacionsuperficietipo,t_id',
            'nivel' => 'nullable|integer|exists:pgsqlcatastro.lc_nu_nivel,t_id',
            'espacio_de_nombres' => 'required|string|max:255',
            'local_id' => 'required|string|max:255',
            't_id_conservacion' => 'nullable|integer|exists:pgsqlcatastro.lc_unidadconstruccion,t_id',
            'lc_caracteristicasunidadconstruccion_conservacion' => 'nullable|integer|exists:pgsqlcatastro.lc_caracteristicasunidadconstruccion,t_id',
        ];
    }
}
