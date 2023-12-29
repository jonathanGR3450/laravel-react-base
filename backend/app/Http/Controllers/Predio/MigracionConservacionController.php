<?php

namespace App\Http\Controllers\Predio;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Predio\MigracionConservacionFormRequest;
use App\Models\ColMiembro;
use App\Models\ColRrrfuente;
use App\Models\ColUebaunit;
use App\Models\ColUnidadfuente;
use App\Models\ExtDireccion;
use App\Models\LcAgrupacionInteresados;
use App\Models\LcCalificacionConvencional;
use App\Models\LcCalificacionNoConvencional;
use App\Models\LcCaracteristicasUnidadConstruccion;
use App\Models\LcConstruccion;
use App\Models\LcContactoVisita;
use App\Models\LcDerecho;
use App\Models\LcFuenteadministrativa;
use App\Models\LcGrupoCalificacion;
use App\Models\LcInteresado;
use App\Models\LcObjetoConstruccion;
use App\Models\LcPredio;
use App\Models\LcTerreno;
use App\Models\LcUnidadconstruccion;
use App\Models\Local\ColMiembroLocal;
use App\Models\Local\LcNumerosPredialLocal;
use App\Models\Local\LcPredioLocal;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MigracionConservacionController extends AppBaseController
{
    /**
     * @OA\Get(
     *     path="/api/v1/predio/{id}",
     *     summary="Obtener información de un predio por ID",
     *     tags={"Predio"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del predio a obtener",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Información del predio",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de la respuesta"),
     *             @OA\Property(property="data", type="array", description="Datos del predio", @OA\Items(
     *                  ref="#/components/schemas/PredioResource"
     *              )),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", description="Estado de la respuesta"),
     *             @OA\Property(property="message", type="string", description="Mensaje de error"),
     *         ),
     *     ),
     * )
     */
    public function __invoke(MigracionConservacionFormRequest $request)
    {
        try {
            $predioId = $request->input('predio');

            $predioLocal = LcPredioLocal::find($predioId)->makeHidden(['t_id']);

            $predioData = $predioLocal->toArray();
            $predioData['t_ili_tid'] = Str::uuid();
            $predioData['comienzo_vida_util_version'] = Carbon::now();

            // lc_predio
            $predioConservacion = LcPredio::create($predioData);

            // pending
            // aqui va la tabla extdireccion
            $numeroPredial = LcNumerosPredialLocal::where('numero_predial', $predioLocal->numero_predial)->get()->first();
            if ($numeroPredial) {
                $extDireccionLocal = $numeroPredial->direccion;
                if ($extDireccionLocal) {
                    $extDireccionData = $extDireccionLocal->makeHidden(['t_id'])->toArray();
                    $extDireccionData['lc_predio_direccion'] = $predioConservacion->t_id;
                    // dd($extDireccionData);
                    ExtDireccion::create($extDireccionData);
                }
            }

            // lc_derecho
            $lcDerechosLocal = $predioLocal->lcDerechos;
            $lcDerechosConservacion = null;
            if ($lcDerechosLocal->count() > 0) {
                foreach ($lcDerechosLocal as $derechoLocal) {
                    // lc_interesado
                    $interesadoLocal = $derechoLocal->interesado;
                    $interesadoConservacionId = null;
                    if ($interesadoLocal) {
                        $interesadoData = $interesadoLocal->makeHidden(['t_id'])->toArray();
                        $interesadoData['comienzo_vida_util_version'] = Carbon::now();
                        $interesadoConservacion = LcInteresado::create($interesadoData);
                        $interesadoConservacionId = $interesadoConservacion->t_id;
                    } else if ($interesadoLocal->interesado_lc_interesado_conservacion) {
                        $interesadoConservacionId = $interesadoLocal->interesado_lc_interesado_conservacion;
                    }

                    // lc_agrupacioninteresados
                    $agrupacionInteresadosLocal = $derechoLocal->agrupacionInteresados;
                    $agrupacionInteresadosConservacionId = null;
                    if ($agrupacionInteresadosLocal) {
                        $agrupacionInteresadosData = $agrupacionInteresadosLocal->makeHidden(['t_id'])->toArray();
                        $agrupacionInteresadosData['comienzo_vida_util_version'] = Carbon::now();
                        $agrupacionInteresadosConservacion = LcAgrupacionInteresados::create($agrupacionInteresadosData);
                        $agrupacionInteresadosConservacionId = $agrupacionInteresadosConservacion->t_id;
                    } else if ($derechoLocal->interesado_lc_agrupacioninteresados_conservacion) {
                        $agrupacionInteresadosConservacionId = $derechoLocal->interesado_lc_agrupacioninteresados_conservacion;
                    }

                    // col_miembros
                    $colMiembroLocal = $agrupacionInteresadosLocal->miembrosAgrupacion;
                    if ($colMiembroLocal->count() > 0) {
                        foreach ($colMiembroLocal as $miembro) {
                            // crear o actualizar interesado
                            $interesado = $miembro->interesadoConservacion;
                            $interesadoCrearActualizarId = null;
                            if ($miembro->interesado_lc_interesado) {
                                $interesadoData = $interesado->makeHidden(['t_id'])->toArray();
                                $interesadoCrearActualizar = LcInteresado::updateOrCreate(
                                    [
                                        'tipo_documento' => $interesado->tipo_documento,
                                        'documento_identidad' => $interesado->documento_identidad
                                    ],
                                    $interesadoData
                                );
                                $interesadoCrearActualizarId = $interesadoCrearActualizar->t_id;
                            } else if ($miembro->interesado_lc_interesado_conservacion) {
                                $interesadoCrearActualizarId = $miembro->interesado_lc_interesado_conservacion;
                            }
                            $colMiembroData = $miembro->makeHidden(['t_id', 'interesado_lc_interesado_conservacion'])->toArray();
                            $colMiembroData['interesado_lc_interesado'] = $interesadoCrearActualizarId;
                            $colMiembroData['interesado_lc_agrupacioninteresados'] = $agrupacionInteresadosConservacionId;
                            $colMiembroData['agrupacion'] = $agrupacionInteresadosConservacionId;
                            $colMiembroConservacion = ColMiembro::create($colMiembroData);
                        }
                    }

                    $lcDerechosData = $derechoLocal->makeHidden(['t_id'])->toArray();
                    $lcDerechosData['interesado_lc_interesado'] = $interesadoConservacionId;
                    $lcDerechosData['interesado_lc_agrupacioninteresados'] = $agrupacionInteresadosConservacionId;
                    $lcDerechosData['comienzo_vida_util_version'] = Carbon::now();
                    $lcDerechosData['local_id'] = $predioConservacion->local_id;
                    $lcDerechosData['unidad'] = $predioConservacion->t_id;
                    $lcDerechosConservacion = LcDerecho::create($lcDerechosData);

                    // lc_fuenteadministrativa
                    $colRrrFuenteLocal = $derechoLocal->colRrrFuente;
                    // dd($colRrrFuenteLocal, $derechoLocal);
                    if ($colRrrFuenteLocal->count() > 0) {
                        foreach ($colRrrFuenteLocal as $fuenteLocal) {
                            $fuenteAdministrativaLocal = $fuenteLocal->fuenteAdministrativa;
                            $fuenteAdministrativaConservacion = null;
                            if ($fuenteAdministrativaLocal) {
                                $lcFuenteAdministrativaData = $fuenteAdministrativaLocal->makeHidden(['t_id'])->toArray();
                                $lcFuenteAdministrativaData['local_id'] = $predioConservacion->local_id;;
                                $fuenteAdministrativaConservacion = LcFuenteadministrativa::create($lcFuenteAdministrativaData);

                                // col_unidadfuente
                                $colUnidadFuenteData = [
                                    'fuente_administrativa' => $fuenteAdministrativaConservacion->t_id,
                                    'unidad' => $predioConservacion->t_id,
                                ];
                                ColUnidadfuente::create($colUnidadFuenteData);
                            }

                            $colRrrFuenteData = [
                                'fuente_administrativa' => $fuenteAdministrativaConservacion?->t_id,
                                'rrr_lc_derecho' => $lcDerechosConservacion->t_id,
                            ];
                            ColRrrfuente::create($colRrrFuenteData);
                        }
                    }
                }
            }


            // lc_predio_copropiedad
            $matrizCopropiedadLocal = $predioLocal->matrizCopropiedad;
            if ($matrizCopropiedadLocal) {
                // validar que no exista
                $matrizCopropiedadLocalData = $matrizCopropiedadLocal->makeHidden(['t_id'])->toArray();
                $matrizCopropiedadLocalData['matriz'] = $predioConservacion->t_id;
                $matrizCopropiedadLocalData['unidad_predial'] = $predioConservacion->t_id;
                $predioConservacion->matrizCopropiedad()->create($matrizCopropiedadLocalData);
            }

            // lc_datosadicionaleslevantamientocatastral
            $datosAdicionalesLevantamientoCatastral = $predioLocal->datosAdicionalesLevantamientoCatastral;
            if ($datosAdicionalesLevantamientoCatastral) {
                $datosAdicionalesLevantamientoCatastralData = $datosAdicionalesLevantamientoCatastral->makeHidden(['t_id'])->toArray();
                $datosAdicionalesLevantamientoCatastralData['lc_predio'] = $predioConservacion->t_id;
                $lcDatosAdicionalesLevantamientoCatastralConservacion = $predioConservacion->datosAdicionalesLevantamientoCatastral()->create($datosAdicionalesLevantamientoCatastralData);
            }

            // lc_contactovisita
            $contactoVisita = $datosAdicionalesLevantamientoCatastral->contactoVisita;
            if ($contactoVisita->count() > 0) {
                foreach ($contactoVisita as $visita) {
                    $contactoVisitaData = $visita->makeHidden(['t_id'])->toArray();
                    $contactoVisitaData['lc_datos_adicionales'] = $lcDatosAdicionalesLevantamientoCatastralConservacion->t_id;
                    LcContactoVisita::create($contactoVisitaData);
                }
            }

            // lc_datosphcondominio
            $lcDatosPhCondominio = $predioLocal->lcDatosPhCondominio;
            if ($lcDatosPhCondominio) {
                $lcDatosPhCondominioData = $lcDatosPhCondominio->makeHidden(['t_id'])->toArray();
                $lcDatosPhCondominioData['lc_predio'] = $predioConservacion->t_id;
                $predioConservacion->lcDatosPhCondominio()->create($lcDatosPhCondominioData);
            }

            // col_uebaunit
            $uebaunit = $predioLocal->uebaunit;
            if ($uebaunit->count() > 0) {
                foreach ($uebaunit as $data) {
                    // lc_construccion
                    $construccion = $data->construccion;
                    $lcConstruccion = null;
                    if ($construccion) {
                        $construccionData = $construccion->makeHidden(['t_id'])->toArray();
                        $construccionData['local_id'] = $predioConservacion->local_id;
                        $lcConstruccion = LcConstruccion::create($construccionData);
                        $lcConstruccionId = $lcConstruccion->t_id;
                    } else {
                        $lcConstruccionId = $data->ue_lc_construccion_conservacion;
                    }

                    // lc_terreno
                    $terreno = $data->terreno;
                    $lcTerreno = null;
                    if ($terreno) {
                        $terrenoData = $terreno->makeHidden(['t_id'])->toArray();
                        $terrenoData['local_id'] = $predioConservacion->local_id;
                        $terrenoData['geometria'] = DB::raw("'SRID=9377;MULTIPOLYGON Z(((4832408.6709 2030025.0384 0, 4832425.918 2030018.6870000008 0, 4832434.0325 2030016.1120999996 0, 4832434.2434 2030016.0450999998 0, 4832437.3198 2030015.0689000003 0, 4832441.5326 2030013.7321000006 0, 4832446.0078 2030012.3118999992 0, 4832459.7596 2030012.2927 0, 4832462.4301 2030011.5408999994 0, 4832486.1948 2030004.8508000001 0, 4832492.5447 2030006.9575999994 0, 4832503.2946 2029996.8961999994 0, 4832503.3181 2029996.8740999997 0, 4832508.3914 2029992.1258000005 0, 4832527.4233 2029985.7522 0, 4832529.3384 2029985.3663999997 0, 4832547.252 2029981.7576000001 0, 4832561.1424 2029986.3661000002 0, 4832571.3063 2029985.1900999993 0, 4832571.53 2029985.1642000005 0, 4832584.2787 2029983.6890999991 0, 4832602.7869 2029981.0186 0, 4832618.6469 2029975.7073 0, 4832640.4627 2029974.3544999994 0, 4832652.3632 2029974.3377999999 0, 4832668.8945 2029976.2981000002 0, 4832671.4022 2029978.2984999996 0, 4832678.8227 2029984.2179000005 0, 4832690.7232 2029984.201199999 0, 4832699.9792 2029984.1882000007 0, 4832710.5217 2029980.7135000005 0, 4832738.3805 2029956.9736000001 0, 4832754.2275 2029942.4063000008 0, 4832759.5083 2029936.4486999996 0, 4832765.4437 2029925.8620999996 0, 4832775.9849 2029899.4015999995 0, 4832783.8834 2029874.2672000006 0, 4832788.4892 2029858.3934000004 0, 4832790.4365 2029832.6061000004 0, 4832793.6941 2029798.2222000007 0, 4832791.0069 2029767.8134000003 0, 4832790.3171 2029747.3190000001 0, 4832788.2735 2029704.3476999998 0, 4832782.2159 2029627.6636999995 0, 4832419.1827 2029484.6133999992 0, 4832404.6312 2029535.8146000002 0, 4832398.8883 2029556.0218000002 0, 4832392.7868 2029577.4909000006 0, 4832387.353 2029596.6104000006 0, 4832381.3186 2029617.8430000003 0, 4832375.5573 2029638.1150000002 0, 4832369.8138 2029658.3243000004 0, 4832363.7115 2029679.7962999996 0, 4832360.7829 2029690.1009 0, 4832355.0449 2029710.2908999994 0, 4832349.2262 2029730.7646999992 0, 4832343.5267 2029750.8193999995 0, 4832343.2855 2029751.7054999992 0, 4832337.891 2029771.5291000009 0, 4832332.4744 2029791.4334999993 0, 4832326.9169 2029811.8561000004 0, 4832321.2293 2029832.7565000001 0, 4832315.6365 2029853.3083999995 0, 4832310.0871 2029873.701199999 0, 4832304.7011 2029893.4932000004 0, 4832299.1071 2029914.049900001 0, 4832293.154 2029935.926000001 0, 4832286.866 2029959.0328000002 0, 4832282.7319 2029974.2245000005 0, 4832280.8763 2029981.043299999 0, 4832304.2382 2029997.542199999 0, 4832315.2948 2030008.0885000005 0, 4832315.3098 2030008.1032999996 0, 4832345.55 2030037.8405000009 0, 4832360.3265 2030040.7742999997 0, 4832361.4218 2030040.991800001 0, 4832376.2269 2030037.7974999994 0, 4832394.1996 2030030.3675999995 0, 4832408.5084 2030025.0982000008 0, 4832408.6709 2030025.0384 0)))'::public.geometry");
                        $lcTerreno = LcTerreno::create($terrenoData);
                        $lcTerrenoId = $lcTerreno->t_id;
                    } else {
                        $lcTerrenoId = $data->ue_lc_terreno_conservacion;
                    }


                    // lc_unidadconstruccion
                    $unidadConstruccion = $data->unidadConstruccion;
                    $lcUnidadConstruccion = null;
                    if ($unidadConstruccion) {

                        // lc_caracteristicasunidadconstruccion
                        $caracteristicasunidadconstruccion = $unidadConstruccion->caracteristicasunidadconstruccion;
                        $lcCaracteristicasunidadconstruccion = null;
                        if ($caracteristicasunidadconstruccion) {
                            $caracteristicasunidadconstruccionData = $caracteristicasunidadconstruccion->makeHidden(['t_id'])->toArray();
                            $lcCaracteristicasunidadconstruccion = LcCaracteristicasUnidadConstruccion::create($caracteristicasunidadconstruccionData);

                            // lc_calificacionconvencional
                            $calificacionConvencional = $caracteristicasunidadconstruccion->calificacionConvencional;
                            $calificacionConvencionalConservacion = null;
                            if ($calificacionConvencional->count() > 0) {
                                foreach ($calificacionConvencional as $convencional) {

                                    $calificacionConvencionalData = $convencional->makeHidden(['t_id'])->toArray();
                                    $calificacionConvencionalData['lc_unidad_construccion'] = $lcCaracteristicasunidadconstruccion->t_id;
                                    $calificacionConvencionalConservacion = LcCalificacionConvencional::create($calificacionConvencionalData);
                                    
                                    // lc_grupocalificacion
                                    $grupoCalificacionLocal = $convencional->grupoCalificacion;
                                    $grupoCalificacionConservacion = null;
                                    if ($grupoCalificacionLocal->count() > 0) {
                                        foreach ($grupoCalificacionLocal as $grupo) {
                                            $grupoCalificacionData = $grupo->makeHidden(['t_id'])->toArray();
                                            $grupoCalificacionData['lc_calificacion_convencional'] = $calificacionConvencionalConservacion->t_id;
                                            $grupoCalificacionConservacion = LcGrupoCalificacion::create($grupoCalificacionData);

                                            // lc_objetoconstruccion
                                            $objetoConstruccionLocal = $grupo->objetoConstruccion;
                                            $objetoConstruccionConservacion = null;
                                            if ($objetoConstruccionLocal->count() > 0) {
                                                foreach ($objetoConstruccionLocal as $objeto) {
                                                    $objetoConstruccionData = $objeto->makeHidden(['t_id'])->toArray();
                                                    $objetoConstruccionData['lc_grupo_calificacion'] = $grupoCalificacionConservacion->t_id;
                                                    $objetoConstruccionConservacion = LcObjetoConstruccion::create($objetoConstruccionData);
                                                }
                                            }

                                        }
                                    }
                                }
                            }



                            // lc_calificacionnoconvencional
                            $calificacionNoConvencional = $caracteristicasunidadconstruccion->calificacionNoConvencional;
                            $calificacionNoConvencionalConservacion = null;
                            if ($calificacionNoConvencional->count() > 0) {
                                foreach ($calificacionNoConvencional as $convencional) {
                                    $calificacionNoConvencionalData = $convencional->makeHidden(['t_id'])->toArray();
                                    $calificacionNoConvencionalData['lc_unidad_construccion'] = $lcCaracteristicasunidadconstruccion->t_id;
                                    $calificacionNoConvencionalConservacion = LcCalificacionNoConvencional::create($calificacionNoConvencionalData);
                                }
                            }
                            $lcCaracteristicasunidadconstruccionId = $lcCaracteristicasunidadconstruccion->t_id;
                        } else {
                            $lcCaracteristicasunidadconstruccionId = $unidadConstruccion->lc_caracteristicasunidadconstruccion_conservacion;
                        }



                        $unidadConstruccionData = $unidadConstruccion->makeHidden(['t_id', 'caracteristicasunidadconstruccion'])->toArray();
                        $unidadConstruccionData['lc_caracteristicasunidadconstruccion'] = $lcCaracteristicasunidadconstruccionId;
                        $unidadConstruccionData['lc_construccion'] = $lcConstruccion?->t_id;
                        if ($unidadConstruccion->lc_construccion_conservacion) {
                            $unidadConstruccionData['lc_construccion'] = $unidadConstruccion->lc_construccion_conservacion;
                        }

                        $lcUnidadConstruccion = LcUnidadconstruccion::create($unidadConstruccionData);
                        $lcUnidadConstruccionId = $lcUnidadConstruccion?->t_id;
                    } else {
                        $lcUnidadConstruccionId = $data->ue_lc_unidadconstruccion_conservacion;
                    }
                    

                    // col_uebaunit
                    $uebaunitData = [
                        'ue_lc_unidadconstruccion' => $lcUnidadConstruccionId,
                        'ue_lc_construccion' => $lcConstruccionId,
                        'ue_lc_terreno' => $lcTerrenoId,
                        'baunit' => $predioConservacion->t_id,
                    ];
                    $colUebaunitConservacion = ColUebaunit::create($uebaunitData);

                }
            }

            return $this->sendSuccess('datos migrados correctamente');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
        
    }
}
