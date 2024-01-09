<?php

namespace App\Http\Requests\CaracteristicasUnidadConstruccion;

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
            'tipo_construccion' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_construcciontipo,t_id'
            ],
            'tipo_dominio' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_dominioconstrucciontipo,t_id'
            ],
            'tipo_unidad_construccion' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_unidadconstrucciontipo,t_id'
            ],
            'tipo_planta' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_construccionplantatipo,t_id'
            ],
            'total_habitaciones' => 'nullable|integer|min:0|max:999999',
            'total_banios' => 'nullable|integer|min:0|max:999999',
            'total_locales' => 'nullable|integer|min:0|max:999999',
            'total_plantas' => 'nullable|integer|min:0|max:150',
            'uso' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_usouconstipo,t_id'
            ],
            'anio_construccion' => 'nullable|integer|min:1512|max:2500',
            'avaluo_unidad_construccion' => 'nullable|numeric|min:0|max:999999999999999',
            'area_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'area_privada_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'fin_vida_util_version' => 'nullable|date',
            'espacio_de_nombres' => 'required|string|max:255',
            'local_id' => 'required|string|max:255',
            'observaciones' => 'nullable|string',
            't_id_conservacion' => 'nullable|integer|exists:pgsqlcatastro.lc_caracteristicasunidadconstruccion,t_id',
        ];
    }
}
