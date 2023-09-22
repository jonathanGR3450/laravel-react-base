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
        Schema::create('lc_grupocalificacion', function (Blueprint $table) {
            $table->bigIncrements('t_id');
            $table->bigInteger('clase_calificacion')->nullable(false);
            $table->bigInteger('conservacion')->nullable(false);
            $table->integer('subtotal')->nullable(false);
            $table->bigInteger('lc_calificacion_convencional')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lc_grupocalificacion');
    }
};
