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
        Schema::create('lc_predio_copropiedad', function (Blueprint $table) {
            $table->id('t_id');
            $table->bigInteger('unidad_predial')->notNull();
            $table->bigInteger('matriz')->notNull();
            $table->decimal('coeficiente', 11, 10)->default(0.0);
            
            $table->foreign('unidad_predial')->references('t_id')->on('lc_predio');
            $table->foreign('matriz')->references('t_id')->on('lc_predio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_predio_copropiedad');
    }
};
