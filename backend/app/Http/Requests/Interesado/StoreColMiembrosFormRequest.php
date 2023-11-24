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
            // Para interesado_lc_interesado:
            'interesado_lc_interesado' => [
                'required',
                'array',
            ],
            'interesado_lc_interesado.tipo' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_interesadotipo,t_id',
            ],
            'interesado_lc_interesado.tipo_documento' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_interesadodocumentotipo,t_id',
            ],
            'interesado_lc_interesado.documento_identidad' => [
                'required',
                'string',
                'max:50',
            ],
            'interesado_lc_interesado.primer_nombre' => [
                'required',
                'string',
                'max:100',
            ],
            'interesado_lc_interesado.segundo_nombre' => [
                'nullable',
                'string',
                'max:100',
            ],
            'interesado_lc_interesado.primer_apellido' => [
                'required',
                'string',
                'max:100',
            ],
            'interesado_lc_interesado.segundo_apellido' => [
                'nullable',
                'string',
                'max:100',
            ],
            'interesado_lc_interesado.sexo' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_sexotipo,t_id',
            ],
            'interesado_lc_interesado.grupo_etnico' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_grupoetnicotipo,t_id',
            ],
            'interesado_lc_interesado.razon_social' => [
                'nullable',
                'string',
                'max:255',
            ],
            'interesado_lc_interesado.estado_civil' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_estadociviltipo,t_id',
            ],
            'interesado_lc_interesado.nombre' => [
                'required',
                'string',
                'max:255',
            ],
            'interesado_lc_interesado.fin_vida_util_version' => [
                'nullable',
                'date_format:Y-m-d H:i:s.u',
            ],
            'interesado_lc_interesado.espacio_de_nombres' => [
                'required',
                'string',
                'max:255',
            ],
            'interesado_lc_interesado.local_id' => [
                'required',
                'string',
                'max:255',
            ],

            // Para interesado_lc_agrupacioninteresados:
            'interesado_lc_agrupacioninteresados' => [
                'required',
                'array',
            ],
            'interesado_lc_agrupacioninteresados.tipo' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.col_grupointeresadotipo,t_id',
            ],
            'interesado_lc_agrupacioninteresados.nombre' => [
                'required',
                'string',
                'max:255',
            ],
            'interesado_lc_agrupacioninteresados.fin_vida_util_version' => [
                'nullable',
                'date_format:Y-m-d H:i:s.u',
            ],
            'interesado_lc_agrupacioninteresados.espacio_de_nombres' => [
                'required',
                'string',
                'max:255',
            ],
            'interesado_lc_agrupacioninteresados.local_id' => [
                'required',
                'string',
                'max:255',
            ],

            // Para participacion:
            'participacion' => [
                'required',
                'numeric',
                'between:0,1',
            ],
        ];
    }
}
