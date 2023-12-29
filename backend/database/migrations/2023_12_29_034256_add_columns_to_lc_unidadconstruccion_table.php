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
        Schema::table('lc_unidadconstruccion', function (Blueprint $table) {
            $table->string('t_id_conservacion')->nullable();
            $table->string('lc_caracteristicasunidadconstruccion_conservacion')->nullable();
            $table->unsignedBigInteger('lc_caracteristicasunidadconstruccion')->nullable()->change();
            $table->unsignedBigInteger('lc_construccion')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lc_unidadconstruccion', function (Blueprint $table) {
            $table->dropColumn('t_id_conservacion');
            $table->dropColumn('lc_caracteristicasunidadconstruccion_conservacion');
            $table->string('lc_caracteristicasunidadconstruccion')->nullable(false)->change();
            $table->string('lc_construccion')->nullable(false)->change();
        });
    }
};
