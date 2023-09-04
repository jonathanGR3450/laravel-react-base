<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtreferenciaregistralsistemaantiguoTipoReferencia extends Model
{
    use HasFactory;

    protected $connection = 'pgsqlcatastro';

    protected $table = 'extreferenciaregistralsistemaantiguo_tipo_referencia';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        't_id',
        'thisclass',
        'baseclass',
        'itfcode',
        'ilicode',
        'seq',
        'inactive',
        'dispname',
        'description',
    ];
}
