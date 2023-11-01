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
        Schema::create('col_rrrfuente', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('fuente_administrativa');
            $table->bigInteger('rrr_lc_derecho')->nullable();
            $table->bigInteger('rrr_lc_restriccion')->nullable();
            
            $table->foreign('fuente_administrativa')->references('t_id')->on('lc_fuenteadministrativa')->deferrable()->initiallyDeferred();
            $table->foreign('rrr_lc_derecho')->references('t_id')->on('lc_derecho')->deferrable()->initiallyDeferred();
            $table->foreign('rrr_lc_restriccion')->references('t_id')->on('lc_restriccion')->deferrable()->initiallyDeferred();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('col_rrrfuente');
    }
};
