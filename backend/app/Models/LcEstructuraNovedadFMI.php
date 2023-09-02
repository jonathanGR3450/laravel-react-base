<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcEstructuraNovedadFMI extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_estructuranovedadfmi';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_seq',
        'codigo_orip',
        'numero_fmi',
        'lc_dtsdcnlstmntctstral_novedad_fmi',
    ];

    // Define la relación con lc_datosadicionaleslevantamientocatastral
    public function datosAdicionalesLevantamientoCatastral()
    {
        return $this->belongsTo(LcDatosAdicionalesLevantamientoCatastral::class, 'lc_dtsdcnlstmntctstral_novedad_fmi', 't_id');
    }
}
