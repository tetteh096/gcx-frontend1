<script setup lang="ts">
// About page component
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <!-- Hero Section -->
    <section class="text-center py-16">
      <h1 class="text-4xl font-bold mb-6">About GCX</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        We are a team of passionate developers and designers dedicated to creating exceptional digital experiences.
      </p>
    </section>

    <!-- Mission Section -->
    <section class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
          <p class="text-gray-600 mb-4">
            At GCX, we believe in the power of technology to transform businesses and enhance human experiences. 
            Our mission is to deliver innovative solutions that drive growth and create meaningful connections.
          </p>
          <p class="text-gray-600">
            We combine cutting-edge technology with thoughtful design to build applications that not only meet 
            today's needs but anticipate tomorrow's challenges.
          </p>
        </div>
        <div class="bg-primary-100 rounded-lg p-8">
          <h3 class="text-xl font-semibold mb-4">What We Value</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Innovation and creativity
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Quality and excellence
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Customer satisfaction
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Continuous learning
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-gray-50">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Our Team</h2>
        <p class="text-gray-600">
          Meet the talented individuals who make GCX possible
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="card text-center">
          <div class="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">John Doe</h3>
          <p class="text-primary-600 mb-2">CEO & Founder</p>
          <p class="text-gray-600 text-sm">
            Passionate about technology and innovation, John leads our team with vision and expertise.
          </p>
        </div>

        <div class="card text-center">
          <div class="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Jane Smith</h3>
          <p class="text-primary-600 mb-2">Lead Developer</p>
          <p class="text-gray-600 text-sm">
            Expert in modern web technologies, Jane brings technical excellence to every project.
          </p>
        </div>

        <div class="card text-center">
          <div class="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Mike Johnson</h3>
          <p class="text-primary-600 mb-2">UI/UX Designer</p>
          <p class="text-gray-600 text-sm">
            Creative designer focused on creating beautiful and intuitive user experiences.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-3xl font-bold text-primary-600 mb-2">50+</div>
          <div class="text-gray-600">Projects Completed</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary-600 mb-2">100%</div>
          <div class="text-gray-600">Client Satisfaction</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary-600 mb-2">5+</div>
          <div class="text-gray-600">Years Experience</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary-600 mb-2">24/7</div>
          <div class="text-gray-600">Support Available</div>
        </div>
      </div>
    </section>
  </div>
</template> 