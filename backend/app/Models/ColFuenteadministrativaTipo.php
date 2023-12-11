<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColFuenteadministrativaTipo extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'col_fuenteadministrativatipo';
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
        return $this->hasMany(LcFuenteadministrativa::class, 'tipo', 't_id');
    }
}
