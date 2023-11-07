<?php

namespace App\Http\Requests\RicPredio;

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
            'fecha_inscripcion_catastral' => 'nullable|date',
            'zona' => 'nullable|integer|exists:pgsqlauxiliar.ric_zonatipo,t_id',
            'vigencia_actualizacion_catastral' => 'nullable|date',
            'estado' => 'nullable|integer|exists:pgsqlauxiliar.ric_estadotipo,t_id',
            'catastro' => 'nullable|integer|exists:pgsqlauxiliar.ric_catastrotipo,t_id',
            'ric_gestorcatastral' => 'nullable|integer|exists:pgsqlauxiliar.ric_gestorcatastral,t_id',
            'ric_operadorcatastral' => 'nullable|integer|exists:pgsqlauxiliar.ric_operadorcatastral,t_id',
            'nombre' => 'nullable|string|max:255',
            'comienzo_vida_util_version' => 'nullable|date',
            'fin_vida_util_version' => 'nullable|date',
            'espacio_de_nombres' => 'nullable|string|max:255',
            'local_id' => 'nullable|string|max:255',
            'lc_predio' => 'nullable|integer|exists:lc_predio,t_id',
        ];
    }
}
