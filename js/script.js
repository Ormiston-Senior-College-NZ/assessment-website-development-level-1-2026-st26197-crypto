/*
Variable list

  backgroundMusic: background music
  backgroundMusicIsPlaying: returns if background music was playing before something was done

  keySequence: correct key sequence to trigger Easter Egg activation
  keySequencePosition: tracker for Easter Egg

  themeToggleButton: 'toggle theme' button
  whiteThemeIsActive: returns if 'html' has class "'white-theme'"
  toggling: returns if theme is currently transitioning

  directorKey: user-inputted answer to which key hinted to press 4
*/

const backgroundMusic = document.getElementById('background-music');
const keySequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
const themeToggleButton = document.getElementById('theme-toggle');

let keySequencePosition = 0;
let toggling = false;

// Restore preferences on load
window.onload = function initialise() {
  document.documentElement.style.visibility = 'hidden';
  console.log('Initialise: hid page');
  document.querySelectorAll('*').forEach(el => {
    el.style.transition = 'none';
  });
  console.log('Initialise: disabled CSS transitions');

  // Restore theme
  if (localStorage.getItem('white-theme-on') === 'true') {
    document.documentElement.classList.add('white-theme');
    console.log('Initialise: applied white theme');
  } else {
    console.log('Initialise: applied red theme');
  }

  /* Distraction so transition doesn't get
  turned on too quickly */
  document.documentElement.offsetHeight;

  document.querySelectorAll('*').forEach(el => {
    el.style.transition = '';
  });
  console.log('Initialise: enabled CSS transitions');
  document.documentElement.style.visibility = 'visible';
  console.log('Initialise: showed page');
};
//

// Show hotkey instructions on mouse movement
  document.addEventListener('mousemove', () => {
    if (sessionStorage.getItem('initial-instructions-showed') === null) {
      console.log('Initial hotkey instructions: displaying alert');
      alert('Hotkeys:\n0: Show hotkeys and actions\n1: Toggle theme\n2: Toggle background music\n\n(Hint: something special may also happen after pressing a certain sequence of keys in the right order...)');
      console.log('Initial hotkey instructions: alert dismissed');
      sessionStorage.setItem('initial-instructions-showed', 'true');
      console.log('Initial hotkey instructions saved to sessionStorage');
    }
  });

// Toggle theme with button
themeToggleButton.addEventListener('click', () => {
  if (toggling === false) {
    toggling = true;
    console.log('Toggle theme: locked theme toggling');

    document.documentElement.classList.toggle('white-theme');
    console.log('Toggle theme: toggled theme');

    // DO NOT PUT THIS BEFORE TOGGLE
    const whiteThemeIsActive = document.documentElement.classList.contains('white-theme');

    if (whiteThemeIsActive) {
      localStorage.setItem('white-theme-on', 'true');
      console.log('Toggle theme: saved white theme to localStorage');
    } else {
      localStorage.removeItem('white-theme-on');
      console.log('Toggle theme: removed white theme from localStorage');
    }

    setTimeout(() => {
      toggling = false;
    }, 1000);
    console.log('Toggle theme: waited 1s, unlocked theme toggling');
  }
});


// Hotkeys and other 'keydown' event listeners
document.addEventListener('keydown', () => {
  // Show hotkeys
  if (event.key === '0') {
    console.log('Show hotkeys: displaying alert');
    alert('Hotkeys:\n0: Show hotkeys and actions\n1: Toggle theme\n2: Toggle background music\n\n(Hint: something special may also happen after pressing a certain sequence of keys in the right order...)');
    console.log('Show hotkeys: alert dismissed');
  }
  //

  // Toggle theme with 1 key
  else if ((event.key === '1') && (toggling === false)) {
    toggling = true;
    console.log('Toggle theme: locked theme toggling');

    document.documentElement.classList.toggle('white-theme');
    console.log('Toggle theme: toggled theme');

    // DO NOT PUT THIS BEFORE TOGGLE
    const whiteThemeIsActive = document.documentElement.classList.contains('white-theme');

    if (whiteThemeIsActive) {
      localStorage.setItem('white-theme-on', 'true');
      console.log('Toggle theme: saved white theme to localStorage');
    } else {
      localStorage.removeItem('white-theme-on');
      console.log('Toggle theme: removed white theme from localStorage');
    }

    setTimeout(() => {
      toggling = false;
    }, 1000);
    console.log('Toggle theme: waited 1s, unlocked theme toggling');
  }
  //

  // Toggle background music with 2 key
  else if (event.key === '2') {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      console.log('Background music: unpaused background music');
      backgroundMusic.muted = false;
      console.log('Background music: unmuted background music')
    } else if (!backgroundMusic.paused) {
    backgroundMusic.muted = !backgroundMusic.muted;
    console.log('Background music: toggled background music mute state');
    }
  }
  //

  // "Secret feature"
  else if (event.key === '3') {
    console.log('"Secret feature": displaying alert');
    alert("This key (3) wasn't even on the hotkey alert, and you weren't supposed to find it.");
    console.log('"Secret feature": alert dismissed');
    console.log('"Secret feature": displaying alert');
    alert('But you found it anyway. Congratulations!');
    console.log('"Secret feature": alert dismissed');
    console.log('"Secret feature": displaying alert');
    alert('But wait... this... this can only mean that...');
    console.log('"Secret feature": alert dismissed');
    console.log('"Secret feature": displaying alert');
    alert('...that you have wasted your time pressing a key that did absolutely nothing!');
    console.log('"Secret feature": alert dismissed');
  }
  //

  // Konami Code
  else if (event.key === keySequence[keySequencePosition]) {
    keySequencePosition++;
    console.log('Konami Code: correct key entered, keySequencePosition is now ' + keySequencePosition);
    if (keySequencePosition === 11) {
      console.log('Konami Code: correct key sequence entered, Konami Code activated');
      window.open('../secret.html', '_self');
      console.log('Konami Code: "secret.html" opened');
      keySequencePosition = 0;
      console.log('Konami Code: keySequencePosition reset to 0, keySequencePosition is now ' + keySequencePosition);
    }
  } else if ((event.key === keySequence[0]) && (keySequencePosition !== 2)) {
    keySequencePosition = 1;
    console.log('Konami Code: key sequence restarted, keySequencePosition is now ' + keySequencePosition);
  } else if ((event.key === keySequence[0]) && (keySequencePosition === 2)) {
    console.log('Konami Code: keySequencePosition remains ' + keySequencePosition);
  } else if (!((event.key === keySequence[0]) && (keySequencePosition === 2))) {
    keySequencePosition = 0;
    console.log('Konami Code: wrong key entered, keySequencePosition reset to 0, keySequencePosition is now ' + keySequencePosition);
  }
});
//

// Something I think you should see
document.getElementById('never-give-up').addEventListener('click', () => {
  const backgroundMusicIsPlaying = !backgroundMusic.paused;
  if (backgroundMusicIsPlaying) {
    backgroundMusic.pause();
    console.log('Something I think you should see: background music paused');
  }
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  console.log('Something I think you should see: "Never Gonna Give You Up" opened in new tab');
  console.log('Something I think you should see: displaying alert');
  alert('HAHAHAHAHA');
  console.log('Something I think you should see: alert dismissed');
  if (backgroundMusicIsPlaying) {
    backgroundMusic.play();
    console.log('Something I think you should see: background music unpaused');
  }
});
