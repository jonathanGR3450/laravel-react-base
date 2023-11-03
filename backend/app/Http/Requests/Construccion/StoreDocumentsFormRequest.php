<?php

namespace App\Http\Requests\Construccion;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentsFormRequest extends FormRequest
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
            'construccion' => 'required|exists:lc_construccion,t_id',
            'archivos' => 'required|array|min:1',
            'archivos.*.file' => 'required|file|mimes:pdf|max:10240',
            'archivos.*.tipo_documento' => 'required|string',
        ];
    }
}
