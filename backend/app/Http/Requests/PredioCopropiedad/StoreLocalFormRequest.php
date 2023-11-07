<?php

namespace App\Http\Requests\PredioCopropiedad;

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
            'unidad_predial' => 'required|integer|exists:lc_predio,t_id',
            'matriz' => 'required|integer|exists:lc_predio,t_id',
            'coeficiente' => 'nullable|numeric|between:0.0,1.0',
        ];
    }
}
