<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidarConstruccionesFormRequest extends FormRequest
{
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
            'construcciones.*.general.identificador' => 'required|string|max:20',
            'construcciones.*.general.tipo_construccion' => 'nullable|integer|exists:lc_construcciontipo,t_id',
            'construcciones.*.general.tipo_dominio' => 'nullable|integer|exists:lc_dominioconstrucciontipo,t_id',
            'construcciones.*.general.tipo_unidad_construccion' => 'required|integer|exists:lc_unidadconstrucciontipo,t_id',
            'construcciones.*.general.tipo_planta' => 'required|integer|exists:lc_construccionplantatipo,t_id',
            'construcciones.*.general.total_habitaciones' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.general.total_banios' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.general.total_locales' => 'nullable|integer|min:0|max:999999',
            'construcciones.*.general.total_plantas' => 'nullable|integer|min:0|max:150',
            'construcciones.*.general.uso' => 'nullable|integer|exists:lc_usouconstipo,t_id',
            'construcciones.*.general.anio_construccion' => 'nullable|integer|min:1512|max:2500',
            'construcciones.*.general.avaluo_unidad_construccion' => 'nullable|numeric|min:0|max:999999999999999',
            'construcciones.*.general.area_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'construcciones.*.general.area_privada_construida' => 'nullable|numeric|min:0|max:99999999999999',
            'construcciones.*.general.comienzo_vida_util_version' => 'required|date',
            'construcciones.*.general.fin_vida_util_version' => 'nullable|date',
            'construcciones.*.general.espacio_de_nombres' => 'required|string|max:255',
            'construcciones.*.general.local_id' => 'required|string|max:255',
            'construcciones.*.general.observaciones' => 'string',
        
            'construcciones.*.estructura.armazon.material' => 'required|string',
            'construcciones.*.estructura.armazon.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.estructura.muros.material' => 'required|string',
            'construcciones.*.estructura.muros.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.estructura.cubierta.material' => 'required|string',
            'construcciones.*.estructura.cubierta.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.estructura.conservacion.estado' => 'required|string',
            'construcciones.*.estructura.conservacion.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.acabados.fachada.nombre' => 'required|string',
            'construcciones.*.acabados.fachada.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.acabados.cubrimiento_muros.nombre' => 'required|string',
            'construcciones.*.acabados.cubrimiento_muros.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.acabados.pisos.nombre' => 'required|string',
            'construcciones.*.acabados.pisos.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.acabados.conservacion.estado' => 'required|string',
            'construcciones.*.acabados.conservacion.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.cocina.tamanio.nombre' => 'required|string',
            'construcciones.*.cocina.tamanio.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.cocina.enchapes.nombre' => 'required|string',
            'construcciones.*.cocina.enchapes.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.cocina.mobiliario.nombre' => 'required|string',
            'construcciones.*.cocina.mobiliario.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.cocina.conservacion.estado' => 'required|string',
            'construcciones.*.cocina.conservacion.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.banios.tamanio.nombre' => 'required|string',
            'construcciones.*.banios.tamanio.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.banios.enchapes.nombre' => 'required|string',
            'construcciones.*.banios.enchapes.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.banios.mobiliario.nombre' => 'required|string',
            'construcciones.*.banios.mobiliario.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.banios.conservacion.estado' => 'required|string',
            'construcciones.*.banios.conservacion.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.complemento_industria.cerchas.material' => 'required|string',
            'construcciones.*.complemento_industria.cerchas.puntaje' => 'required|integer|min:0',
        
            'construcciones.*.puntaje_total' => 'required|integer|min:0',
            'construcciones.*.puntajes_sumados.estructura' => 'required|integer|min:0',
            'construcciones.*.puntajes_sumados.acabados' => 'required|integer|min:0',
            'construcciones.*.puntajes_sumados.cocina' => 'required|integer|min:0',
            'construcciones.*.puntajes_sumados.banios' => 'required|integer|min:0',
        ];
    }
}
