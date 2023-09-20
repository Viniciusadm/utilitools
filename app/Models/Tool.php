<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $name
 * @property string $type
 * @property string $category
 * @property string $route
 */
class Tool extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'category',
    ];

    protected $appends = [
        'route',
    ];

    public function getRouteAttribute(): string
    {
        return route('' . $this->type . '.' . $this->category);
    }
}
