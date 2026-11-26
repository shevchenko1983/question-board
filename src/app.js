const appStatus = document.querySelector('[data-app-status]');

if (appStatus) {
  appStatus.textContent = 'Your board is ready to begin.';
}

document.querySelector('.auth-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (appStatus) {
    appStatus.textContent = 'Sign-in will be available after setup.';
  }
});
