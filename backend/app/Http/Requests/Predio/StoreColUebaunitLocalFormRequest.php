<?php

namespace App\Http\Requests\Predio;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreColUebaunitLocalFormRequest extends FormRequest
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
            'ue_lc_unidadconstruccion' => 'nullable|integer|exists:lc_unidadconstruccion,t_id',
            'ue_lc_construccion' => 'nullable|integer|exists:lc_construccion,t_id',
            'ue_lc_terreno' => 'nullable|integer|exists:lc_terreno,t_id',
            'baunit' => 'required|integer|exists:lc_predio,t_id',
        ];
    }
}
