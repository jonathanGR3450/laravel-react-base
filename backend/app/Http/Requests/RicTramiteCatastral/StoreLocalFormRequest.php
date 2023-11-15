<?php

namespace App\Http\Requests\RicTramiteCatastral;

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
            'clasificacion_mutacion' => 'nullable|integer|exists:pgsqlauxiliar.ric_mutaciontipo,t_id',
            'numero_resolucion' => 'nullable|string|max:30',
            'fecha_resolucion' => 'nullable|date',
            'fecha_radicacion' => 'nullable|date',
            'ric_predio' => 'nullable|integer|exists:ric_predio,t_id',
        ];
    }
}
