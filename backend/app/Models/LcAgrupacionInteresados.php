<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcAgrupacionInteresados extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_agrupacioninteresados';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'nombre',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    // Relación con LcDerecho
    public function derechos()
    {
        return $this->hasMany(LcDerecho::class, 'interesado_lc_agrupacioninteresados', 't_id');
    }
}
