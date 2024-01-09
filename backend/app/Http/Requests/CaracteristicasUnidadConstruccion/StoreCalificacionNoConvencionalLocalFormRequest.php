<?php

namespace App\Http\Requests\CaracteristicasUnidadConstruccion;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreCalificacionNoConvencionalLocalFormRequest extends FormRequest
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
        // dd($this->all());
        return [
            'tipo_anexo' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_anexotipo,t_id'
            ],
            'lc_unidad_construccion' => 'nullable|integer|exists:lc_caracteristicasunidadconstruccion,t_id',
            'lc_unidad_construccion_conservacion' => 'nullable|integer|exists:pgsqlcatastro.lc_caracteristicasunidadconstruccion,t_id',
        ];
    }
}
