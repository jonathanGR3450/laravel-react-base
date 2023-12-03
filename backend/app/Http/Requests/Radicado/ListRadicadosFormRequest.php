<?php

namespace App\Http\Requests\Radicado;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class ListRadicadosFormRequest extends FormRequest
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
            'perPage'       => ['nullable', 'integer'],
            'sort'          => ['nullable', 'string'],
            'direction'     => ['nullable', 'string', 'in:ASC,DESC,asc,desc'],
        ];
    }
}
