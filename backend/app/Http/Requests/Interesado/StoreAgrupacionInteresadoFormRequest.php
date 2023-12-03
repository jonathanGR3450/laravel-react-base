<?php

namespace App\Http\Requests\Interesado;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreAgrupacionInteresadoFormRequest extends FormRequest
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
            'tipo' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.col_grupointeresadotipo,t_id',
            ],
            'nombre' => [
                'required',
                'string',
                'max:255',
            ],
            'fin_vida_util_version' => [
                'nullable',
                'date_format:Y-m-d H:i:s.u',
            ],
            'espacio_de_nombres' => [
                'required',
                'string',
                'max:255',
            ],
            'local_id' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }
}
