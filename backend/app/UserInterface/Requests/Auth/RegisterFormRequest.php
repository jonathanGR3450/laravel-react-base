<?php

namespace App\UserInterface\Requests\Auth;

use App\UserInterface\Requests\CustomFormRequest;

class RegisterFormRequest extends CustomFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $this->id,
            'password' => 'required|string|min:6|confirmed',
            'identification' => 'required|numeric',
            'cell_phone' => 'required|numeric',
            'city' => 'required',
            'address' => 'required',
            'city_register' => 'required',
            'is_manager' => 'required|boolean',
            'is_signer' => 'required|boolean',
            'is_verified' => 'nullable',
        ];
    }
}
