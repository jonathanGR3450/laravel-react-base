<?php

namespace App\Http\Requests\DatosPHCondominio;

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
            'area_total_terreno' => 'nullable|numeric|between:0,99999999999999.98',
            'area_total_terreno_privada' => 'nullable|numeric|between:0,99999999999999.98',
            'area_total_terreno_comun' => 'nullable|numeric|between:0,99999999999999.98',
            'area_total_construida' => 'nullable|numeric|between:0,99999999999999.98',
            'area_total_construida_privada' => 'nullable|numeric|between:0,99999999999999.98',
            'area_total_construida_comun' => 'nullable|numeric|between:0,99999999999999.98',
            'numero_torres' => 'nullable|integer|between:0,1000',
            'total_unidades_privadas' => 'nullable|integer|between:0,99999999',
            'lc_predio' => 'required|exists:lc_predio,t_id',
        ];
    }
}
