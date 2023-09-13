<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidarConstruccionesFormRequest;
use Illuminate\Http\Request;

class ClasificacionStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ValidarConstruccionesFormRequest $request)
    {
        dd($request->validated());
    }
}
