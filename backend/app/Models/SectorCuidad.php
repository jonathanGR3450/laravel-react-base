<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectorCuidad extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'extdireccion_sector_ciudad';
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
    public function direcciones()
    {
        return $this->hasMany(ExtDireccion::class, 'sector_ciudad', 't_id');
    }
}
