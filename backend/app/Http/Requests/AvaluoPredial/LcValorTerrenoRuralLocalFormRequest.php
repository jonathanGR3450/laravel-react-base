<?php

namespace App\Http\Requests\AvaluoPredial;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class LcValorTerrenoRuralLocalFormRequest extends FormRequest
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
            'zona_economica'       => ['nullable', 'string'],
            'vigencia'          => ['nullable', 'integer'],
        ];
    }
}
