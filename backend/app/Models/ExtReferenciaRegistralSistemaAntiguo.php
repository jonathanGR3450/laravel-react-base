<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtReferenciaRegistralSistemaAntiguo extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'extreferenciaregistralsistemaantiguo';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_seq',
        'tipo_referencia',
        'oficina',
        'libro',
        'tomo',
        'pagina',
        'numero',
        'dia',
        'mes',
        'anio',
        'matricula',
        'lc_predio_referencia_registral_sistema_antiguo'
    ];

    // Relación con lc_predio
    public function lcPredio()
    {
        return $this->belongsTo(LcPredio::class, 'lc_predio_referencia_registral_sistema_antiguo', 't_id');
    }

    // Relación con extreferenciaregistralsistemaantiguo_tipo_referencia
    public function tipoReferencia()
    {
        return $this->belongsTo(ExtReferenciaRegistralSistemaAntiguoTipoReferencia::class, 'tipo_referencia', 't_id');
    }
}
