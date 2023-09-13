<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lc_calificacionconvencional', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->bigInteger('tipo_calificar')->nullable(false);
            $table->integer('total_calificacion')->nullable(false);
            $table->bigInteger('lc_unidad_construccion')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_calificacionconvencional');
    }
};
