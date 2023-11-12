<?php

namespace App\Http\Requests\Datosadicionaleslevantamientocatastral;

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
            'tiene_area_registral' => 'required|boolean',
            'area_registral_m2' => 'nullable|numeric|between:0,10000000000000000000000',
            'procedimiento_catastral_registral' => 'required|integer|exists:pgsqlcatastro.lc_procedimientocatastralregistraltipo,t_id',
            'observaciones' => 'nullable|string|max:500',
            'fecha_visita_predial' => 'required|date',
            'tipo_documento_reconocedor' => 'required|integer|exists:pgsqlcatastro.lc_interesadodocumentotipo,t_id',
            'numero_documento_reconocedor' => 'required|string|max:50',
            'primer_nombre_reconocedor' => 'required|string|max:100',
            'segundo_nombre_reconocedor' => 'nullable|string|max:100',
            'primer_apellido_reconocedor' => 'required|string|max:100',
            'segundo_apellido_reconocedor' => 'nullable|string|max:100',
            'resultado_visita' => 'required|integer|exists:pgsqlcatastro.lc_resultadovisitatipo,t_id',
            'otro_cual_resultado_visita' => 'nullable|string|max:255',
            'suscribe_acta_colindancia' => 'nullable|boolean',
            'despojo_abandono' => 'nullable|boolean',
            'estrato' => 'nullable|integer|exists:pgsqlcatastro.lc_estratotipo,t_id',
            'otro_cual_estrato' => 'nullable|string|max:255',
            'lc_predio' => 'required|integer|exists:lc_predio,t_id',
        ];
    }
}
