<?php

namespace App\Http\Requests\TramiteRadicado;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class StoreTramiteRadicadoFormRequest extends FormRequest
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
            'radicado' => 'required|string',
            'id' => 'required|string',
            'tipo_tramite' => 'required|string',
            'fecha_radicado' => 'required|date',
            'tipo_predio' => 'required|string',
            'numero_predial' => 'required|string',
            'estado' => 'required|string',
            'fecha_notificacion' => 'required|date',
            'metodo_notificacion' => 'required|string',
            'observaciones' => 'nullable|string',
        ];
    }
}
