<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColRrrfuente extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'col_rrrfuente';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'fuente_administrativa',
        'rrr_lc_derecho',
        'rrr_lc_restriccion',
    ];

    public function fuenteAdministrativa()
    {
        return $this->belongsTo(LcFuenteadministrativa::class, 'fuente_administrativa', 't_id');
    }

    public function rrrDerecho()
    {
        return $this->belongsTo(LcDerecho::class, 'rrr_lc_derecho', 't_id');
    }

    // public function rrrRestriccion()
    // {
    //     return $this->belongsTo(LcRestriccion::class, 'rrr_lc_restriccion', 't_id');
    // }
}
