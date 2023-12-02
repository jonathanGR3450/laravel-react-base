<?php

namespace App\Http\Requests\Interesado;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreColMiembrosFormRequest extends FormRequest
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
            'interesado_lc_interesado' => [
                'nullable',
                'integer',
                'exists:lc_interesado,t_id',
            ],
            'interesado_lc_interesado_conservacion' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_interesado,t_id',
            ],
            'interesado_lc_agrupacioninteresados' => [
                'required',
                'integer',
                'exists:lc_agrupacioninteresados,t_id',
            ],
            'agrupacion' => [
                'required',
                'integer',
                'exists:lc_agrupacioninteresados,t_id',
            ],
            'participacion' => [
                'required',
                'numeric',
                'between:0,1',
            ],
        ];
    }
}
