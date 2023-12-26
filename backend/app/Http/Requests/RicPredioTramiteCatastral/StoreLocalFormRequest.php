<?php

namespace App\Http\Requests\RicPredioTramiteCatastral;

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
            'ric_tramite_catastral' => 'nullable|integer|exists:ric_tramitecatastral,t_id',
            'ric_predio' => 'nullable|integer|exists:ric_predio,t_id',
        ];
    }
}
