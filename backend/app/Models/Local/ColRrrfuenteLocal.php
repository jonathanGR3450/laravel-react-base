<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColRrrfuenteLocal extends Model
{
    use HasFactory;

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
        return $this->belongsTo(LcFuenteadministrativaLocal::class, 'fuente_administrativa', 't_id');
    }

    public function rrrDerecho()
    {
        return $this->belongsTo(LcDerechoLocal::class, 'rrr_lc_derecho', 't_id');
    }

    public function rrrRestriccion()
    {
        return $this->belongsTo(LcRestriccionLocal::class, 'rrr_lc_restriccion', 't_id');
    }
}
