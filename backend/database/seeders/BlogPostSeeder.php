<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Getting Started with Vue.js 3',
                'content' => 'Vue.js 3 introduces the Composition API, which provides a more flexible way to organize component logic. This new API allows you to group related functionality together, making your code more readable and maintainable. In this post, we\'ll explore the key features of Vue 3 and how to get started with the Composition API.',
                'excerpt' => 'Learn how to get started with Vue.js 3 and the new Composition API for building modern web applications.',
                'author' => 'John Doe',
                'featured_image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
                'tags' => ['Vue.js', 'JavaScript', 'Frontend'],
                'published_at' => now()->subDays(5)
            ],
            [
                'title' => 'Building APIs with Laravel',
                'content' => 'Laravel provides excellent tools for building RESTful APIs. From resource controllers to API resources, Laravel makes it easy to create robust and scalable APIs. In this tutorial, we\'ll build a complete API with authentication, validation, and proper error handling.',
                'excerpt' => 'A comprehensive guide to building RESTful APIs with Laravel, including authentication and validation.',
                'author' => 'Jane Smith',
                'featured_image' => 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800',
                'tags' => ['Laravel', 'PHP', 'API', 'Backend'],
                'published_at' => now()->subDays(3)
            ],
            [
                'title' => 'Modern CSS with Tailwind',
                'content' => 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides a comprehensive set of utility classes that make styling your components quick and efficient. Learn how to use Tailwind CSS to create beautiful, responsive designs.',
                'excerpt' => 'Discover how to use Tailwind CSS to create modern, responsive web designs with utility classes.',
                'author' => 'Mike Johnson',
                'featured_image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
                'tags' => ['CSS', 'Tailwind', 'Frontend', 'Design'],
                'published_at' => now()->subDays(1)
            ]
        ];

        foreach ($posts as $post) {
            $post['slug'] = Str::slug($post['title']);
            BlogPost::create($post);
        }
    }
}
