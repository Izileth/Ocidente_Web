// Add JavaScript code here for animations or other interactive features
// Example: Fade-in effect on hover
const sections = document.querySelectorAll('section');

sections.forEach(section => {
  section.addEventListener('mouseover', function() {
    section.classList.add('fade-in');
  });
  section.addEventListener('mouseout', function() {
    section.classList.remove('fade-in');
  });
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScrollAnimation() {
  const elements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-from-bottom');

  elements.forEach((el) => {
    if (isElementInViewport(el)) {
      el.classList.add('is-visible');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // Verifica a visibilidade inicial ao carregar a página

// Mecanismo de pagamento

const stripe = Stripe('SUA_CHAVE_PUBLICA_STRIPE');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { token, error } = await stripe.createToken(cardElement);

  if (error) {
    const errorElement = document.getElementById('card-errors');
    errorElement.textContent = error.message;
  } else {
    stripeTokenHandler(token);
  }
});

function stripeTokenHandler(token) {
  const form = document.getElementById('payment-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}
