<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcEstructuraNovedadNumeroPredial extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_estructuranovedadnumeropredial';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_seq',
        'numero_predial',
        'tipo_novedad',
        'lc_dtsdcnlstmntctstral_novedad_numeros_prediales',
    ];

    // public function tipoNovedad()
    // {
    //     return $this->belongsTo(LcEstructuraNovedadNumeroPredialTipo::class, 'tipo_novedad', 't_id');
    // }

    public function datosAdicionalesLevantamientoCatastral()
    {
        return $this->belongsTo(LcDatosAdicionalesLevantamientoCatastral::class, 'lc_dtsdcnlstmntctstral_novedad_numeros_prediales', 't_id');
    }
}
