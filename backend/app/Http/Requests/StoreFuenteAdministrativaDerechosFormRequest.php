<?php

namespace App\Http\Requests;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *    schema="StoreNumerosPredialesFormRequest",
 *    @OA\Property(
 *        property="numeros_prediales",
 *        type="array",
 *        @OA\Items(
 *            type="string"
 *        ),
 *        description="Array de numeros prediales",
 *        nullable=false,
 *    ),
 * )
 */
class StoreFuenteAdministrativaDerechosFormRequest extends FormRequest
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
            'numeros_relacion' => 'required|array|min:1',
            'numeros_relacion.*.fuente_administrativa' => 'required|integer|exists:lc_fuenteadministrativa,t_id',
            'numeros_relacion.*.rrr_lc_derecho' => 'nullable|integer|exists:lc_derecho,t_id',
            'numeros_relacion.*.rrr_lc_restriccion' => 'nullable|integer|exists:lc_restriccion,t_id',
        ];
    }
}
