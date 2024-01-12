<?php

namespace App\Http\Requests\CaracteristicasUnidadConstruccion;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreCalificacionConvencionalLocalFormRequest extends FormRequest
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
            'tipo_calificar' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_calificartipo,t_id'
            ],
            'total_calificacion' => 'required|integer|min:0|max:999999999',
            'lc_unidad_construccion' => 'nullable|integer|exists:lc_caracteristicasunidadconstruccion,t_id',
            'lc_unidad_construccion_conservacion' => 'nullable|integer|exists:pgsqlcatastro.lc_caracteristicasunidadconstruccion,t_id',
        ];
    }
}
