<?php

namespace App\Http\Requests;

use App\Traits\ValidationErrorResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class IndexNumeroPredialesRequest extends FormRequest
{
    use ValidationErrorResponseTrait;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'perPage'       => ['nullable', 'integer'],
            'sort'          => ['nullable', 'string'],
            'direction'     => ['nullable', 'string', 'in:ASC,DESC,asc,desc'],
        ];
    }
}
