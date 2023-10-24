<?php

namespace App\Http\Requests;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;


/**
 * @OA\Schema(
 *    schema="StoreNumerosHomologadosFormRequest",
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
class StoreNumerosHomologadosFormRequest extends FormRequest
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
            'numeros_homologados_csv' => 'required|file|mimes:csv,txt',
        ];
    }
}
