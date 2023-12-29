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
        Schema::table('lc_calificacionnoconvencional', function (Blueprint $table) {
            $table->string('lc_unidad_construccion_conservacion')->nullable();
            $table->unsignedBigInteger('lc_unidad_construccion')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lc_calificacionnoconvencional', function (Blueprint $table) {
            $table->dropColumn('lc_unidad_construccion_conservacion');
            $table->string('lc_unidad_construccion')->nullable(false)->change();
        });
    }
};
