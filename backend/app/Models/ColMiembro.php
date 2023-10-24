<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColMiembro extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'col_miembros';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'interesado_lc_interesado',
        'interesado_lc_agrupacioninteresados',
        'agrupacion',
        'participacion',
    ];

    public function interesado()
    {
        return $this->belongsTo(LcInteresado::class, 'interesado_lc_interesado', 't_id');
    }

    public function agrupacionInteresados()
    {
        return $this->belongsTo(LcAgrupacionInteresados::class, 'interesado_lc_agrupacioninteresados', 't_id');
    }

    public function agrupacionRelacion()
    {
        return $this->belongsTo(LcAgrupacionInteresados::class, 'agrupacion', 't_id');
    }
}
