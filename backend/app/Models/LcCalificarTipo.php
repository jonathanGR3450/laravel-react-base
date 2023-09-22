<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcCalificarTipo extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_calificartipo';
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
        'description',
    ];

    public function calificacionesConvencionales()
    {
        return $this->hasMany(LcCalificacionConvencional::class, 'tipo_calificar', 't_id');
    }
}
