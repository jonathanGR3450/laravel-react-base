<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait PaginationTrait
{
    /**Array key value,  */
    private $sortable_default = [
        'id'            => 'id',
    ];

    public function paginationQuery($query, $sortable = [], $request)
    {
        $sortable = array_merge($this->sortable_default, $sortable);

        /**pagination */
        $perPage   = $request->input('limit');
        $sort      = $request->input('sort') ?? null;
        $direction = $request->input('direction') ?? 'ASC';
        $sort      = (array_key_exists($sort, $sortable)) ? $sortable[$sort] : null;
        $direction = (in_array(Str::upper($direction), ['ASC', 'DESC'])) ? $direction : 'DESC';
        if ($sort)
            return $query->orderBy($sort, $direction)->paginate($perPage);
        else
            return $query->orderBy('t_id', $direction)->paginate($perPage);
    }
}
