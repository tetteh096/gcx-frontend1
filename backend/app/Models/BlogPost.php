<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'author',
        'featured_image',
        'tags',
        'published_at'
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime'
    ];

    protected $dates = [
        'published_at'
    ];

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }
}
