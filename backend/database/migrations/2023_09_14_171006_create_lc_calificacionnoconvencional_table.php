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
        Schema::create('lc_calificacionnoconvencional', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->bigInteger('tipo_anexo')->nullable(false);
            $table->bigInteger('lc_unidad_construccion')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_calificacionnoconvencional');
    }
};
