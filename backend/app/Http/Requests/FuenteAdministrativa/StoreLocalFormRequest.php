<?php

namespace App\Http\Requests\FuenteAdministrativa;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreLocalFormRequest extends FormRequest
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
            'tipo' => 'required|exists:pgsqlcatastro.col_fuenteadministrativatipo,t_id',
            'ente_emisor' => 'required|string|max:255',
            'observacion' => 'string|max:255',
            'numero_fuente' => 'string|max:150',
            'estado_disponibilidad' => 'required|exists:pgsqlcatastro.col_estadodisponibilidadtipo,t_id',
            'tipo_principal' => 'exists:pgsqlcatastro.ci_forma_presentacion_codigo,t_id',
            'fecha_documento_fuente' => 'date',
            'espacio_de_nombres' => 'required|string|max:255',
        ];
    }
}
