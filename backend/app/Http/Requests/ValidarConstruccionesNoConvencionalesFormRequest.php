<?php

namespace App\Http\Requests;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class ValidarConstruccionesNoConvencionalesFormRequest extends FormRequest
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
    public function rules()
    {
        return [
            'construcciones' => 'required|array|min:1',
            'construcciones.*.caracteristicasunidadconstruccion.identificador' => 'required|string|max:20',
            'construcciones.*.caracteristicasunidadconstruccion.tipo_construccion' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_construcciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.tipo_dominio' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_dominioconstrucciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.tipo_unidad_construccion' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_unidadconstrucciontipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.tipo_planta' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_construccionplantatipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.total_habitaciones' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.caracteristicasunidadconstruccion.total_banios' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.caracteristicasunidadconstruccion.total_locales' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.caracteristicasunidadconstruccion.total_plantas' => 'nullable|integer|min:0|max:150',
            'construcciones.*.caracteristicasunidadconstruccion.uso' => [
                'nullable',
                'integer',
                'exists:pgsqlcatastro.lc_usouconstipo,t_id'
            ],
            'construcciones.*.caracteristicasunidadconstruccion.anio_construccion' => 'nullable|integer|min:1512|max:2500',
            'construcciones.*.caracteristicasunidadconstruccion.avaluo_unidad_construccion' => 'nullable|numeric|min:0|max:999999999999999',
            'construcciones.*.caracteristicasunidadconstruccion.area_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'construcciones.*.caracteristicasunidadconstruccion.area_privada_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'construcciones.*.caracteristicasunidadconstruccion.comienzo_vida_util_version' => 'required|date',
            'construcciones.*.caracteristicasunidadconstruccion.fin_vida_util_version' => 'nullable|date',
            'construcciones.*.caracteristicasunidadconstruccion.espacio_de_nombres' => 'required|string|max:255',
            'construcciones.*.caracteristicasunidadconstruccion.local_id' => 'required|string|max:255',
            'construcciones.*.caracteristicasunidadconstruccion.observaciones' => 'nullable|string',
        
            'construcciones.*.caracteristicasunidadconstruccion.calificacionnoconvencional' => 'required|array|min:1',
            'construcciones.*.caracteristicasunidadconstruccion.calificacionnoconvencional.*.tipo_anexo' => [
                'required',
                'integer',
                'exists:pgsqlcatastro.lc_anexotipo,t_id'
            ],
        ];
    }
}
