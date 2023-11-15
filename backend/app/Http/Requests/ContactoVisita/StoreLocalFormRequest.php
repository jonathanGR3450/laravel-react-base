<?php

namespace App\Http\Requests\ContactoVisita;

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
            'tipo_documento_quien_atendio' => 'required|integer|exists:pgsqlcatastro.lc_interesadodocumentotipo,t_id',
            'numero_documento_quien_atendio' => 'required|string|max:50',
            'primer_nombre_quien_atendio' => 'required|string|max:100',
            'segundo_nombre_quien_atendio' => 'nullable|string|max:100',
            'primer_apellido_quien_atendio' => 'required|string|max:100',
            'segundo_apellido_quien_atendio' => 'nullable|string|max:100',
            'domicilio_notificaciones' => 'nullable|string|max:255',
            'celular' => 'nullable|string|max:20',
            'correo_electronico' => 'nullable|email|max:100',
            'autoriza_notificaciones' => 'nullable|boolean',
            'lc_datos_adicionales' => 'required|integer|exists:lc_datosadicionaleslevantamientocatastral,t_id',
        ];
    }
}
