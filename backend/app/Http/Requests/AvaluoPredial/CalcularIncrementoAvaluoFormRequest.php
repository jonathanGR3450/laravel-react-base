<?php

namespace App\Http\Requests\AvaluoPredial;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class CalcularIncrementoAvaluoFormRequest extends FormRequest
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
        $tables = [
            'lc_valor_terreno_rural',
            'tab_anexos_urbana_rural',
            'tab_cc_f03_60_urbana_rural',
            'tab_hot_60_urbana_rural',
            'tab_bod_60_urbana_rural',
            'tab_santa_maria_de_los_angeles_urbana',
            'tab_viv_60_urbana_rural',
            'lc_valor_terreno_urbana',
            "tab_com_60_urbana_rural",
        ];
        return [
            'vigencia'          => ['required', 'integer'],
            'incremento'       => ['required', 'numeric'],
            'tablas'       => ['required', 'array', "min:1"],
            'tablas.*'       => ['required', 'string', "in:" . implode(",", $tables)],
        ];
    }
}
