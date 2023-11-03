<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lc_documentos_costruccion', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('construccion');
            $table->string('nombre');
            $table->string('ruta');
            $table->string('url');
            $table->string('tipo_documento');

            $table->foreign('construccion')->references('t_id')->on('lc_construccion')->deferrable()->initiallyDeferred();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_documentos_costruccion');
    }
};
