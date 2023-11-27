<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcConstruccionTipo extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_construcciontipo';
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

    function unidadConstrucciones() : HasMany {
        return $this->hasMany(LcCaracteristicasUnidadConstruccion::class, 'tipo_construccion');
    }

    function construccion() : HasMany {
        return $this->hasMany(LcConstruccion::class, 'tipo_construccion');
    }

}
