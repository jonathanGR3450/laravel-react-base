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
        Schema::table('lc_caracteristicasunidadconstruccion', function (Blueprint $table) {
            $table->string('t_id_conservacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lc_caracteristicasunidadconstruccion', function (Blueprint $table) {
            $table->dropColumn('t_id_conservacion');
        });
    }
};
