<?php

namespace App\Http\Requests\Predio;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class IndexPredioFormRequest extends FormRequest
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
            'numero_predial' => 'nullable|string|exists:pgsqlcatastro.lc_predio,numero_predial',
            'matricula_inmobiliaria' => 'nullable|string|exists:pgsqlcatastro.lc_predio,matricula_inmobiliaria',
        ];
    }
}
