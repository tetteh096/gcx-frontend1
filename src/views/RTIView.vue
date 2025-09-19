<script setup lang="ts">
import { ref } from 'vue'
import { isDarkMode } from '../utils/darkMode'
import Footer from '../components/Footer.vue'
import RTIHeroSlider from '../components/RTI/RTIHeroSlider.vue'
import RTINavigation from '../components/RTI/RTINavigation.vue'
import RTIOverview from '../components/RTI/RTIOverview.vue'
import RTIContact from '../components/RTI/RTIContact.vue'

const applicationForm = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  informationType: '',
  informationDetails: '',
  purpose: '',
  preferredFormat: 'electronic'
})

const isSubmitting = ref(false)
const activeTab = ref('overview')

const submitApplication = async () => {
  isSubmitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Your RTI application has been submitted successfully. You will receive a confirmation email shortly.')
    applicationForm.value = {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      informationType: '',
      informationDetails: '',
      purpose: '',
      preferredFormat: 'electronic'
    }
  } catch (error) {
    alert('There was an error submitting your application. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const downloadRTIManual = () => {
  // Simulate download
  const link = document.createElement('a')
  link.href = '/gcx-rti-manual.pdf'
  link.download = 'GCX-RTI-Manual.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadApplicationForm = () => {
  // Simulate download
  const link = document.createElement('a')
  link.href = '/gcx-rti-application-form.pdf'
  link.download = 'GCX-RTI-Application-Form.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exemptCategories = [
  'Information for the President or the Vice-President',
  'Information relating to Cabinet',
  'Information relating to law enforcement and public safety',
  'Information affecting international relations',
  'Information that affects the security of the State',
  'Economic and any other interests',
  'Economic information of third parties',
  'Information relating to tax',
  'Internal working information of public institutions',
  'Parliamentary privilege, fair trial, contempt of court',
  'Privilege information',
  'Disclosure of personal matters'
]
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <!-- Hero Slider -->
    <RTIHeroSlider />

    <!-- Mini Navigation -->
    <RTINavigation v-model:activeTab="activeTab" />

    <!-- Overview Section -->
    <RTIOverview v-if="activeTab === 'overview'" />

    <!-- Application Form Section -->
    <section v-if="activeTab === 'application'" class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            RTI Application Form
          </h2>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            Submit your request for information under the Right to Information Act, 2019
          </p>
        </div>

        <div class="rounded-2xl p-8 shadow-lg" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'">
          <form @submit.prevent="submitApplication" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  Full Name *
                </label>
                <input
                  v-model="applicationForm.fullName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  Email Address *
                </label>
                <input
                  v-model="applicationForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  Phone Number
                </label>
                <input
                  v-model="applicationForm.phone"
                  type="tel"
                  class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  Address
                </label>
                <input
                  v-model="applicationForm.address"
                  type="text"
                  class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Type of Information Requested *
              </label>
              <input
                v-model="applicationForm.informationType"
                type="text"
                required
                placeholder="e.g., Financial records, Policy documents, Meeting minutes"
                class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Detailed Description of Information *
              </label>
              <textarea
                v-model="applicationForm.informationDetails"
                rows="4"
                required
                placeholder="Please provide specific details about the information you are requesting..."
                class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Purpose of Request
              </label>
              <textarea
                v-model="applicationForm.purpose"
                rows="3"
                placeholder="Please explain why you need this information..."
                class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Preferred Format
              </label>
              <select
                v-model="applicationForm.preferredFormat"
                class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
              >
                <option value="electronic">Electronic (Email)</option>
                <option value="physical">Physical (Hard Copy)</option>
                <option value="both">Both Formats</option>
              </select>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Submitting Application...
              </span>
              <span v-else>Submit RTI Application</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Resources Section -->
    <section v-if="activeTab === 'resources'" class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Download Resources
          </h2>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            Access important documents and forms for your RTI application
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- RTI Manual -->
          <div class="rounded-2xl p-8 shadow-lg text-center" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" :class="isDarkMode ? 'bg-green-900/30' : 'bg-green-100'">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              GCX RTI Manual
            </h3>
            <p class="text-lg mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Comprehensive guide to understanding the Right to Information process at GCX
            </p>
            <button
              @click="downloadRTIManual"
              class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Download Manual
            </button>
          </div>

          <!-- Application Form -->
          <div class="rounded-2xl p-8 shadow-lg text-center" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" :class="isDarkMode ? 'bg-green-900/30' : 'bg-green-100'">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              RTI Application Form
            </h3>
            <p class="text-lg mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              Download the official application form to submit your information request
            </p>
            <button
              @click="downloadApplicationForm"
              class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Download Form
            </button>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="mt-12 rounded-2xl p-8" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-gray-200'">
          <h3 class="text-2xl font-bold mb-6" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Additional Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                Processing Time
              </h4>
              <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                RTI applications are typically processed within 14 days of receipt. Complex requests may require additional time as permitted by law.
              </p>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                Fees
              </h4>
              <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                Basic information is provided free of charge. Reasonable fees may apply for photocopying and other services as prescribed by law.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Exempt Information Section -->
    <section v-if="activeTab === 'exemptions'" class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Exempt Information
          </h2>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            Information that may be exempt from disclosure under the RTI Act, 2019
          </p>
        </div>

        <div class="rounded-2xl p-8 shadow-lg" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(category, index) in exemptCategories"
              :key="index"
              class="flex items-start gap-4 p-4 rounded-xl"
              :class="isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'"
            >
              <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                   :class="isDarkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'">
                {{ index + 1 }}
              </div>
              <p class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                {{ category }}
              </p>
            </div>
          </div>

          <div class="mt-8 p-6 rounded-xl" :class="isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'">
            <h4 class="text-lg font-semibold mb-3" :class="isDarkMode ? 'text-red-300' : 'text-red-800'">
              Important Note
            </h4>
            <p class="text-sm leading-relaxed" :class="isDarkMode ? 'text-red-200' : 'text-red-700'">
              The above categories represent information that may be exempt from disclosure. Each request is evaluated on a case-by-case basis, and exemptions are applied only when necessary to protect legitimate interests as specified in the RTI Act, 2019.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <RTIContact v-if="activeTab === 'contact'" />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>