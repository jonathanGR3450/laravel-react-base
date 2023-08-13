<?php

namespace App\UserInterface\Requests\Auth;

use App\UserInterface\Requests\CustomFormRequest;
use Illuminate\Validation\Rule;

class BlogFormRequest extends CustomFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
        ];
    }
}
