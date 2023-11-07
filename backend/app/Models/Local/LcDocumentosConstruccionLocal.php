<?php

namespace App\Models\Local;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcDocumentosConstruccionLocal extends Model
{
    use HasFactory;

    protected $table = 'lc_documentos_costruccion';
    protected $primaryKey = 't_id';
    public $timestamps = false;

    protected $fillable = [
        'construccion',
        'nombre',
        'ruta',
        'url',
        'tipo_documento',
    ];

    public function construccion()
    {
        return $this->belongsTo(LcConstruccionLocal::class, 'construccion', 't_id');
    }
}
