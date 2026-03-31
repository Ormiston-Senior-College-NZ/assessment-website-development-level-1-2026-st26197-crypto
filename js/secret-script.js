document.querySelectorAll('.fake').forEach(el => {
  el.addEventListener('click', () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    console.log('Fake navigation: "Never Gonna Give You Up" opened in new tab');
    console.log('Fake navigation: displaying alert');
    alert('HAHAHAHAHA');
    console.log('Fake navigation: alert dismissed');
    console.log('Fake navigation: displaying alert');
  });
});

document.addEventListener('keydown', () => {
  if (event.key === '0') {
    alert("Use the back button in your browser, haha. (or press 'Alt' + 'Left Arrow' on Windows/Linux or 'Command' + 'Left Arrow' on Mac)")
  }
});