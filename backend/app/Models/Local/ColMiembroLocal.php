<?php

namespace App\Models\Local;

use App\Models\LcInteresado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColMiembroLocal extends Model
{
    use HasFactory;

    protected $table = 'col_miembros';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'interesado_lc_interesado',
        'interesado_lc_interesado_conservacion',
        'interesado_lc_agrupacioninteresados',
        'agrupacion',
        'participacion',
    ];

    public function interesado()
    {
        return $this->belongsTo(LcInteresadoLocal::class, 'interesado_lc_interesado', 't_id');
    }

    public function interesadoConservacion()
    {
        return $this->belongsTo(LcInteresado::class, 'interesado_lc_interesado_conservacion', 't_id');
    }

    public function agrupacionInteresados()
    {
        return $this->belongsTo(LcAgrupacionInteresadosLocal::class, 'interesado_lc_agrupacioninteresados', 't_id');
    }

    public function agrupacionRelacion()
    {
        return $this->belongsTo(LcAgrupacionInteresadosLocal::class, 'agrupacion', 't_id');
    }
}
