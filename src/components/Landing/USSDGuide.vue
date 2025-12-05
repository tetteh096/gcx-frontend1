<script setup lang="ts">
import { ref } from 'vue'
import { isDarkMode } from '../../utils/darkMode'
import { 
  PhoneIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  UserIcon, 
  LockClosedIcon, 
  ShoppingCartIcon 
} from '@heroicons/vue/24/outline'

const activeTab = ref(0)

const steps = [
  {
    id: 1,
    title: 'Dial USSD Code',
    description: 'Start your registration by dialing the USSD code on your mobile phone',
    instruction: 'Dial *998# on your mobile phone',
    details: 'This will connect you to the GCX USSD platform. Make sure you have an active mobile network connection.',
    icon: PhoneIcon
  },
  {
    id: 2,
    title: 'Select Registration',
    description: 'Choose the registration option from the main menu',
    instruction: 'Select option 1: "Register" from the menu',
    details: 'You will see a menu with various options. Select the registration option to begin creating your account.',
    icon: UserIcon
  },
  {
    id: 3,
    title: 'Enter Personal Details',
    description: 'Provide your personal information to create your account',
    instruction: 'Enter your full name, phone number, and email address',
    details: 'You will be prompted to enter your personal details. Make sure to provide accurate information as this will be used for account verification and trading activities.',
    icon: CheckCircleIcon
  },
  {
    id: 4,
    title: 'Set Up Security',
    description: 'Create a secure PIN for your account',
    instruction: 'Create a 4-digit PIN and confirm it',
    details: 'Choose a PIN that is easy for you to remember but hard for others to guess. This PIN will be required for all transactions on the platform.',
    icon: LockClosedIcon
  },
  {
    id: 5,
    title: 'Complete Registration',
    description: 'Finalize your registration and start trading',
    instruction: 'Confirm your registration and wait for confirmation message',
    details: 'After completing all steps, you will receive a confirmation message. You can now start buying and selling commodities on the GCX platform through USSD.',
    icon: ShoppingCartIcon
  }
]

const setActiveTab = (index: number) => {
  activeTab.value = index
}
</script>

<template>
  <section 
    class="py-16 transition-colors duration-300" 
    :class="isDarkMode ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-white via-yellow-50 to-white'"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 
          class="text-4xl sm:text-5xl font-bold mb-4 transition-colors duration-300"
          :class="isDarkMode ? 'text-white' : 'text-slate-900'"
        >
          <span>USSD Trading</span>
          <span class="text-green-600 ml-2">Guide</span>
        </h2>
        <p 
          class="text-lg sm:text-xl max-w-2xl mx-auto transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          Follow these simple steps to register and start trading commodities via USSD
        </p>
      </div>

      <!-- Tabs Navigation -->
      <div class="mb-8">
        <div class="flex flex-wrap justify-center gap-2 sm:gap-4 border-b transition-colors duration-300" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
          <button
            v-for="(step, index) in steps"
            :key="step.id"
            @click="setActiveTab(index)"
            class="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 relative"
            :class="activeTab === index 
              ? isDarkMode 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-green-600 border-b-2 border-green-600'
              : isDarkMode 
                ? 'text-slate-400 hover:text-slate-300' 
                : 'text-slate-500 hover:text-slate-700'"
          >
            <span class="hidden sm:inline">Step {{ step.id }}: </span>{{ step.title }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 border transition-colors duration-300" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
        <div v-for="(step, index) in steps" :key="step.id" v-show="activeTab === index">
          <div class="flex flex-col lg:flex-row gap-8 items-start">
            <!-- Left: Icon and Step Info -->
            <div class="flex-shrink-0">
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300"
                :class="isDarkMode ? 'bg-green-600/20 border-2 border-green-500/50' : 'bg-green-100 border-2 border-green-200'"
              >
                <component 
                  :is="step.icon" 
                  class="w-10 h-10 transition-colors duration-300"
                  :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                />
              </div>
              <div class="mt-4 text-center">
                <div 
                  class="text-sm font-semibold transition-colors duration-300"
                  :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'"
                >
                  Step {{ step.id }} of {{ steps.length }}
                </div>
              </div>
            </div>

            <!-- Right: Content -->
            <div class="flex-1">
              <h3 
                class="text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-300"
                :class="isDarkMode ? 'text-white' : 'text-slate-900'"
              >
                {{ step.title }}
              </h3>
              
              <p 
                class="text-lg mb-6 transition-colors duration-300"
                :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
              >
                {{ step.description }}
              </p>

              <!-- Instruction Box -->
              <div 
                class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 mb-6 border-2 transition-colors duration-300"
                :class="isDarkMode ? 'border-green-500/30' : 'border-green-200'"
              >
                <div class="flex items-start gap-4">
                  <ArrowRightIcon 
                    class="w-6 h-6 flex-shrink-0 mt-1 transition-colors duration-300"
                    :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                  />
                  <div>
                    <div 
                      class="text-sm font-semibold mb-2 transition-colors duration-300"
                      :class="isDarkMode ? 'text-green-400' : 'text-green-700'"
                    >
                      What to do:
                    </div>
                    <div 
                      class="text-xl font-bold transition-colors duration-300"
                      :class="isDarkMode ? 'text-white' : 'text-slate-900'"
                    >
                      {{ step.instruction }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Details -->
              <div 
                class="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 transition-colors duration-300"
              >
                <div 
                  class="text-sm font-semibold mb-2 transition-colors duration-300"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
                >
                  Additional Information:
                </div>
                <p 
                  class="leading-relaxed transition-colors duration-300"
                  :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
                >
                  {{ step.details }}
                </p>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between items-center mt-8 pt-6 border-t transition-colors duration-300" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                <button
                  v-if="activeTab > 0"
                  @click="setActiveTab(activeTab - 1)"
                  class="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  :class="isDarkMode 
                    ? 'bg-slate-700 text-white hover:bg-slate-600' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                >
                  <ArrowRightIcon class="w-5 h-5 rotate-180" />
                  Previous Step
                </button>
                <div v-else></div>

                <button
                  v-if="activeTab < steps.length - 1"
                  @click="setActiveTab(activeTab + 1)"
                  class="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Next Step
                  <ArrowRightIcon class="w-5 h-5" />
                </button>
                <div
                  v-else
                  class="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold"
                >
                  <CheckCircleIcon class="w-5 h-5" />
                  Registration Complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Tips -->
      <div class="mt-8 grid sm:grid-cols-3 gap-4">
        <div 
          class="p-4 rounded-xl border transition-colors duration-300"
          :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'"
        >
          <div 
            class="text-sm font-semibold mb-1 transition-colors duration-300"
            :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
          >
            No Internet Required
          </div>
          <p 
            class="text-xs transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
          >
            USSD works on any mobile phone without internet connection
          </p>
        </div>
        <div 
          class="p-4 rounded-xl border transition-colors duration-300"
          :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'"
        >
          <div 
            class="text-sm font-semibold mb-1 transition-colors duration-300"
            :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
          >
            Secure & Safe
          </div>
          <p 
            class="text-xs transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
          >
            All transactions are secured with your PIN
          </p>
        </div>
        <div 
          class="p-4 rounded-xl border transition-colors duration-300"
          :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'"
        >
          <div 
            class="text-sm font-semibold mb-1 transition-colors duration-300"
            :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
          >
            Available 24/7
          </div>
          <p 
            class="text-xs transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
          >
            Access trading services anytime, anywhere
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

