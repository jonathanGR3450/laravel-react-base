<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->bigInteger('identification');
            $table->string('cell_phone');
            $table->string('city');
            $table->string('address');
            $table->string('city_register');
            $table->boolean('is_manager');
            $table->boolean('is_signer');
            $table->string('is_verified')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }

    // aplicar modelos con patron de estados
    // aplicar factory para crear los DTO, estas factories se crean en la capa de aplicacion, usan el dominio

    //  vincular empresas
    // necesito subir ocho archivos
    // proceso de vinculacion
    // tabla tipo proceso
    // tabla proceso
    // tabla archivos
    //  tabla tipo documentos
    // tabla estados
    // enviar documentos para notificar que fueron subidos los documentos
};
