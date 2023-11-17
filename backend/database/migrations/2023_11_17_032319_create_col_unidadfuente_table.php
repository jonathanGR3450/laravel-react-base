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
        Schema::create('col_unidadfuente', function (Blueprint $table) {
            $table->id("t_id");
            $table->bigInteger('fuente_administrativa')->unsigned();
            $table->bigInteger('unidad')->unsigned();
            
            $table->foreign('fuente_administrativa')->references('t_id')->on('lc_fuenteadministrativa')->deferrable()->initiallyDeferred();
            $table->foreign('unidad')->references('t_id')->on('lc_predio')->deferrable()->initiallyDeferred();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('col_unidadfuente');
    }
};
