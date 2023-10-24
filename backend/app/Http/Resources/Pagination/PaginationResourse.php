<?php

namespace App\Http\Resources\Pagination;

use Illuminate\Http\Resources\Json\JsonResource;

class PaginationResourse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'total'         => $this->total(),
            'per_page'      => $this->perPage(),
            'current_page'  => $this->currentPage(),
            'last_page'     => $this->lastPage(),
            'from'          => $this->firstItem(),
            'to'            => $this->lastItem(),
            'first_page_url' => $this->url(1),
            'self'          => $this->url($this->currentPage()),
            'last_page_url' => $this->url($this->lastPage()),
            'next_page_url' => $this->nextPageUrl(),
            'prev_page_url' => $this->previousPageUrl(),
            'path'          => $this->path(),
        ];
    }
}
