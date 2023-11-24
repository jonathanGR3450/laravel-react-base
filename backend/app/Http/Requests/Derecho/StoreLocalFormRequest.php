<?php

namespace App\Http\Requests\Derecho;

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
            'tipo' => 'required|exists:pgsqlcatastro.lc_derechotipo,t_id',
            'fraccion_derecho' => 'required|numeric|between:0,1',
            'fecha_inicio_tenencia' => 'nullable|date',
            'descripcion' => 'nullable|string|max:255',
            'interesado_lc_interesado' => 'required|exists:lc_interesado,t_id',
            'interesado_lc_agrupacioninteresados' => 'nullable|exists:lc_agrupacioninteresados,t_id',
            'unidad' => 'nullable|exists:lc_predio,t_id',
            'espacio_de_nombres' => 'required|string|max:255',
        ];
    }
}
