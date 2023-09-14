<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LcAnexoTipo extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'lc_anexotipo';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_ili_tid',
        'thisclass',
        'baseclass',
        'itfcode',
        'ilicode',
        'seq',
        'inactive',
        'dispname',
        'description',
    ];

    function calificacionesConvencionales(): HasMany {
        return $this->hasMany(CalificacionConvencional::class, 'tipo_anexo', 't_id');
    }

}
