<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColUnidadfuente extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';
    
    protected $table = 'col_unidadfuente';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'fuente_administrativa',
        'unidad',
    ];

    public function fuenteAdministrativa()
    {
        return $this->belongsTo(LcFuenteadministrativa::class, 'fuente_administrativa', 't_id');
    }

    public function unidad()
    {
        return $this->belongsTo(LcPredio::class, 'unidad', 't_id');
    }
}
