<?php

namespace App\Http\Requests\Predio;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreLcPredioFormRequest extends FormRequest
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
            'departamento' => 'required|size:2',
            'municipio' => 'required|size:3',
            'id_operacion' => 'required|max:30',
            'tiene_fmi' => 'required|boolean',
            'codigo_orip' => 'max:3',
            'matricula_inmobiliaria' => 'max:80',
            'numero_predial' => 'required|max:30',
            'numero_predial_anterior' => 'max:20',
            'codigo_homologado' => 'max:11',
            'interrelacionado' => 'required|boolean',
            'codigo_homologado_fmi' => 'required|boolean',
            'nupre' => 'max:11',
            'avaluo_catastral' => 'required|numeric|between:0,999999999999999',
            'valor_referencia' => 'numeric|between:0,999999999999999',
            'tipo' => 'required|exists:pgsqlcatastro.lc_prediotipo,t_id',
            'condicion_predio' => 'required|exists:pgsqlcatastro.lc_condicionprediotipo,t_id',
            'destinacion_economica' => 'required|exists:pgsqlcatastro.lc_destinacioneconomicatipo,t_id',
            'clase_suelo' => 'required|exists:pgsqlcatastro.lc_clasesuelotipo,t_id',
            'categoria_suelo' => 'nullable|exists:pgsqlcatastro.lc_categoriasuelotipo,t_id',
            'nombre' => 'max:255',
            'comienzo_vida_util_version' => 'required|date',
            'fin_vida_util_version' => 'nullable|date|after:comienzo_vida_util_version',
            'espacio_de_nombres' => 'required|max:255',
            'local_id' => 'required|max:255',
        ];
    }
}
