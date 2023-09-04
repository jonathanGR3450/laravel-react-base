<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcInteresado extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_interesado';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'tipo_documento',
        'documento_identidad',
        'primer_nombre',
        'segundo_nombre',
        'primer_apellido',
        'segundo_apellido',
        'sexo',
        'grupo_etnico',
        'razon_social',
        'estado_civil',
        'nombre',
        'comienzo_vida_util_version',
        'fin_vida_util_version',
        'espacio_de_nombres',
        'local_id',
    ];

    // Relación con LcDerecho
    public function derechos()
    {
        return $this->hasMany(LcDerecho::class, 'interesado_lc_interesado', 't_id');
    }
}
