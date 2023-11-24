<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcNuNivel extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_nu_nivel';
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
        return $this->hasMany(LcTerreno::class, 'nivel');
    }
}
