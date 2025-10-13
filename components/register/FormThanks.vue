<template>
  <div class="thank-you-container">
    <div class="image-section">
      <img class="thank-you-image" src="/images/contact_us.svg" alt="Thank you illustration" />
    </div>
    <div class="content-section">
      <h1 class="main-heading">Thank You for Joining JOSA! 🎉</h1>
      <div class="message-content">
        <p class="primary-message">
          We're thrilled to have you as part of our community! Your application to volunteer with JOSA has been successfully submitted.
        </p>
        <div class="next-steps">
          <h2 class="steps-heading">What happens next?</h2>
          <ul class="steps-list">
            <li>
              <span class="step-icon">🔍</span>
              <span>Our team will carefully review your application</span>
            </li>
            <li>
              <span class="step-icon">📧</span>
              <span>You'll receive an email confirmation within 24-48 hours</span>
            </li>
            <li>
              <span class="step-icon">🤝</span>
              <span>We'll reach out with next steps and opportunities</span>
            </li>
          </ul>
        </div>
        <p class="closing-message">
          Keep an eye on your inbox and spam folder. We can't wait to work with you in making a positive impact!
        </p>
        <p class="contact-info">
          Questions? Feel free to <a href="https://josa.ngo/contact-us" class="contact-link">contact us</a> anytime.
        </p>
        <button @click="closeRegistration" class="button button-flat button-blue-full">Go Back to the homepage</button>
      </div>
    </div>
  </div>
</template>
<script setup>
  const emit = defineEmits(['closeRegistration'])
  const closeRegistration = () => {
    emit('closeRegistration')
  }
</script>
<style lang="postcss" scoped>
.thank-you-container {
  @apply flex flex-col lg:flex-row items-center justify-center min-h-[60vh] gap-8 lg:gap-12 p-6 lg:p-12;
  max-width: 1200px;
  margin: 0 auto;
}

.image-section {
  @apply flex-shrink-0;
}

.thank-you-image {
  @apply w-80 h-80 lg:w-96 lg:h-96 object-contain;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1));
}

.content-section {
  @apply flex-1 text-center lg:text-left space-y-6;
}

.main-heading {
  @apply text-3xl lg:text-4xl font-bold text-gray-800 mb-4;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.message-content {
  @apply space-y-6;
}

.primary-message {
  @apply text-lg text-gray-700 leading-relaxed;
}

.next-steps {
  @apply bg-gray-50 rounded-lg p-6 border border-gray-200;
}

.steps-heading {
  @apply text-xl font-semibold text-gray-800 mb-4;
}

.steps-list {
  @apply space-y-3 list-none;
}

.steps-list li {
  @apply flex items-center gap-3 text-gray-700;
}

.step-icon {
  @apply text-xl flex-shrink-0;
}

.closing-message {
  @apply text-lg text-gray-700 leading-relaxed font-medium;
}

.contact-info {
  @apply text-gray-600;
}

.contact-link {
  @apply text-blue-600 hover:text-blue-800 underline transition-colors duration-200;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .thank-you-container {
    @apply text-center;
  }

  .content-section {
    @apply text-center;
  }

  .steps-list li {
    @apply justify-center lg:justify-start;
  }
}

/* Animation for image */
.thank-you-image {
  animation: gentle-bounce 2s ease-in-out infinite;
}

@keyframes gentle-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
