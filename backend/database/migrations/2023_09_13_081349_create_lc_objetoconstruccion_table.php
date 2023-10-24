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
        Schema::create('lc_objetoconstruccion', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->bigInteger('tipo_objeto_construccion')->nullable(false);
            $table->integer('puntos')->nullable(false);
            $table->bigInteger('lc_grupo_calificacion')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_objetoconstruccion');
    }
};
