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
        Schema::table('lc_derecho', function (Blueprint $table) {
            $table->string('unidad_conservacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lc_derecho', function (Blueprint $table) {
            $table->dropColumn('unidad_conservacion');
        });
    }
};
