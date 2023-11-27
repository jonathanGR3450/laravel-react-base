<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ColDimensionTipo extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'col_dimensiontipo';
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

    function terreno() : HasMany {
        return $this->hasMany(LcTerreno::class, 'dimension');
    }

    function construccion() : HasMany {
        return $this->hasMany(LcConstruccion::class, 'relacion_superficie');
    }
}
