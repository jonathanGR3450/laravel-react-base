<?php

namespace App\Http\Requests\CaracteristicasUnidadConstruccion;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class MigrateLocalFormRequest extends FormRequest
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
            't_id_conservacion' => 'required|integer|exists:lc_caracteristicasunidadconstruccion,t_id_conservacion',
        ];
    }
}
