<?php

namespace App\Http\Requests\Convencional;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    use ValidationErrorResponseTrait;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'perPage'       => ['nullable', 'integer'],
            'sort'          => ['nullable', 'string'],
            'direction'     => ['nullable', 'string', 'in:ASC,DESC,asc,desc'],
            'tipo_construccion' => 'nullable|integer|exists:pgsqlcatastro.lc_construcciontipo,t_id',
            'tipo_dominio' => 'nullable|integer|exists:pgsqlcatastro.lc_dominioconstrucciontipo,t_id',
            'tipo_unidad_construccion' => 'nullable|integer|exists:pgsqlcatastro.lc_unidadconstrucciontipo,t_id',
            'tipo_planta' => 'nullable|integer|exists:pgsqlcatastro.lc_construccionplantatipo,t_id',
            'total_habitaciones' => 'nullable|integer',
            'total_banios' => 'nullable|integer',
            'total_locales' => 'nullable|integer',
            'total_plantas' => 'nullable|integer',
            'uso' => 'nullable|integer|exists:pgsqlcatastro.lc_usouconstipo,t_id',
        ];
    }
}
