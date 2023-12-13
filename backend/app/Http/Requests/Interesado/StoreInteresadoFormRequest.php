<?php

namespace App\Http\Requests\Interesado;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreInteresadoFormRequest extends FormRequest
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
                'exists:pgsqlcatastro.lc_interesadotipo,t_id',
            ],
            'tipo_documento' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_interesadodocumentotipo,t_id',
            ],
            'documento_identidad' => [
                'required',
                'string',
                'max:50',
            ],
            'primer_nombre' => [
                'nullable',
                'string',
                'max:100',
            ],
            'segundo_nombre' => [
                'nullable',
                'string',
                'max:100',
            ],
            'primer_apellido' => [
                'nullable',
                'string',
                'max:100',
            ],
            'segundo_apellido' => [
                'nullable',
                'string',
                'max:100',
            ],
            'sexo' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_sexotipo,t_id',
            ],
            'grupo_etnico' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_grupoetnicotipo,t_id',
            ],
            'razon_social' => [
                'nullable',
                'string',
                'max:255',
            ],
            'estado_civil' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_estadociviltipo,t_id',
            ],
            'nombre' => [
                'nullable',
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
