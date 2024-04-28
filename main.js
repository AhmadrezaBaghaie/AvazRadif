let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_folder = document.querySelector(".track-folder");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    "name": "01. Dastgah Shour",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/01. Dastgah Shour.mp3",
    "folder": "Playlist"
  },
  {
    "name": "02. Avaz Abuata",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/02. Avaz Abuata.mp3",
    "folder": "Playlist"
  },
  {
    "name": "03. Avaz Afshari",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/03. Avaz Afshari.mp3",
    "folder": "Playlist"
  },
  {
    "name": "04. Avaz Bayate Tork",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/04. Avaz Bayate Tork.mp3",
    "folder": "Playlist"
  },
  {
    "name": "05. Avaz Dashti",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/05. Avaz Dashti.mp3",
    "folder": "Playlist"
  },
  {
    "name": "06. Dastgah Nava",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/06. Dastgah Nava.mp3",
    "folder": "Playlist"
  },
  {
    "name": "07. Dastgah Mahour",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/07. Dastgah Mahour.mp3",
    "folder": "Playlist"
  },
  {
    "name": "08. Dastgah Segah",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/08. Dastgah Segah.mp3",
    "folder": "Playlist"
  },
  {
    "name": "09. Avaz Segah Ghafghaz",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/09. Avaz Segah Ghafghaz.mp3",
    "folder": "Playlist"
  },
  {
    "name": "10. Dastgah Chahargah",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/10. Dastgah Chahargah.mp3",
    "folder": "Playlist"
  },
  {
    "name": "11. Dastgah Rastpanjgah",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/11. Dastgah Rastpanjgah.mp3",
    "folder": "Playlist"
  },
  {
    "name": "12. Dastgah Homayoun & Avaz Bayate Esfahan",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/12. Dastgah Homayoun & Avaz Bayate Esfahan.mp3",
    "folder": "Playlist"
  },
  {
    "name": "13. Avaz Bayate Esfahan",
    "artist": "Abbas Kazemi",
    "image": "Avaz - Kazemi/cover art.png",
    "path": "Avaz - Kazemi/Playlist/13. Avaz Bayate Esfahan.mp3",
    "folder": "Playlist"
  }
];


function random_bg_color() {

  // Get a number between 128 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 128;
  let green = Math.floor(Math.random() * 256) + 128;
  let blue = Math.floor(Math.random() * 256) + 128;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url('" + track_list[track_index].image + "')";
  track_name.textContent = track_list[track_index].name;
  track_folder.textContent = track_list[track_index].folder;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "Playing " + (track_index + 1) + " of " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}


function createScrollableList() {
  const trackListContainer = document.getElementById('trackList');
  const folders = {};

  track_list.forEach((track, index) => {
    if (!folders[track.folder]) {
      folders[track.folder] = true;

      const folderItem = document.createElement('div');
      folderItem.textContent = track.folder;
      folderItem.classList.add('listItem', 'folderName');
      trackListContainer.appendChild(folderItem);
    }

    const trackItem = document.createElement('div');
    const spaces = '\xa0'.repeat(4); // '\xa0' is a non-breaking space
    trackItem.textContent = `${spaces} ${track.name}`;
    trackItem.classList.add('listItem', 'trackItem');
    trackItem.addEventListener('click', function() {
      track_index = index;
      loadTrack(track_index);
      playTrack();
      highlightTrack(track_index);
    });

    trackListContainer.appendChild(trackItem);
  });
}


function highlightTrack(index) {
  const trackItems = document.querySelectorAll('.trackItem');
  trackItems.forEach((item, idx) => {
    if (idx === index) {
      item.classList.add('activeTrack'); // Apply a class to highlight the active track
    } else {
      item.classList.remove('activeTrack'); // Remove the class from other tracks
    }
  });
}



// Call the function to generate the scrollable list
createScrollableList();



// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  highlightTrack(track_index);
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
  highlightTrack(track_index);
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
  highlightTrack(track_index);
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

