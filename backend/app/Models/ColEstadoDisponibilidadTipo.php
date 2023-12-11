<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColEstadoDisponibilidadTipo extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'col_estadodisponibilidadtipo';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'thisclass',
        'baseclass',
        'itfcode',
        'ilicode',
        'seq',
        'inactive',
        'dispname',
        'description'
    ];

    // Relación con lc_predio
    public function fuenteAdministrativa()
    {
        return $this->hasMany(LcFuenteadministrativa::class, 'estado_disponibilidad', 't_id');
    }
}
