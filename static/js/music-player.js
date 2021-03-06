! function(e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).GreenAudioPlayer = e()
  }
}(function() {
  return function a(o, s, l) {
    function d(t, e) {
      if (!s[t]) {
        if (!o[t]) {
          var n = "function" == typeof require && require;
          if (!e && n) return n(t, !0);
          if (u) return u(t, !0);
          var i = new Error("Cannot find module '" + t + "'");
          throw i.code = "MODULE_NOT_FOUND", i
        }
        var r = s[t] = {
          exports: {}
        };
        o[t][0].call(r.exports, function(e) {
          return d(o[t][1][e] || e)
        }, r, r.exports, a, o, s, l)
      }
      return s[t].exports
    }
    for (var u = "function" == typeof require && require, e = 0; e < l.length; e++) d(l[e]);
    return d
  }({
    1: [function(e, t, n) {
      "use strict";
      t.exports = e("./src/js/main").default
    }, {
      "./src/js/main": 2
    }],
    2: [function(e, t, n) {
      "use strict";

      function o(e, t) {
        return function(e) {
          if (Array.isArray(e)) return e
        }(e) || function(e, t) {
          if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
          var n = [],
            i = !0,
            r = !1,
            a = void 0;
          try {
            for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); i = !0);
          } catch (e) {
            r = !0, a = e
          } finally {
            try {
              i || null == s.return || s.return()
            } finally {
              if (r) throw a
            }
          }
          return n
        }(e, t) || function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
      }

      function i(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.default = void 0;
      var r = function() {
        function a(e, t) {
          ! function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, a), this.audioPlayer = "string" == typeof e ? document.querySelector(e) : e;
          var n = t || {},
            i = this.audioPlayer.innerHTML;
          (this.audioPlayer.classList.add("green-audio-player"), this.audioPlayer.innerHTML = a.getTemplate() + i, this.playPauseBtn = this.audioPlayer.querySelector(".play-pause-btn"), this.loading = this.audioPlayer.querySelector(".loading"), this.sliders = this.audioPlayer.querySelectorAll(".slider"), this.progress = this.audioPlayer.querySelector(".controls__progress"), this.volumeBtn = this.audioPlayer.querySelector(".volume__button"), this.volumeControls = this.audioPlayer.querySelector(".volume__controls"), this.volumeProgress = this.volumeControls.querySelector(".volume__progress"), this.player = this.audioPlayer.querySelector("audio"), this.currentTime = this.audioPlayer.querySelector(".controls__current-time"), this.totalTime = this.audioPlayer.querySelector(".controls__total-time"), this.speaker = this.audioPlayer.querySelector(".volume__speaker"), this.download = this.audioPlayer.querySelector(".download"), this.downloadLink = this.audioPlayer.querySelector(".download__link"), this.draggableClasses = ["pin"], this.currentlyDragged = null, this.stopOthersOnPlay = n.stopOthersOnPlay || !1, n.showDownloadButton && this.showDownload(), this.initEvents(), this.directionAware(), this.overcomeIosLimitations(), "autoplay" in this.player.attributes) && (this.player.parentElement.querySelector(".play-pause-btn__icon").attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z")
        }
        var e, t, n;
        return e = a, n = [{
          key: "init",
          value: function(t) {
            document.querySelectorAll(t.selector).forEach(function(e) {
              new a(e, t)
            })
          }
        }, {
          key: "getTemplate",
          value: function() {
            return '\n            <div class="loading">\n                <div class="loading__spinner"></div>\n            </div>\n            \n            <div class="play-pause-btn">\n                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">\n                    <path fill="#566574" fill-rule="evenodd" d="M18 12L0 24V0" class="play-pause-btn__icon"/>\n                </svg>\n            </div>\n    \n            <div class="controls">\n                <span class="controls__current-time">0:00</span>\n                <div class="controls__slider slider" data-direction="horizontal">\n                    <div class="controls__progress gap-progress">\n                        <div class="pin progress__pin" data-method="rewind"></div>\n                    </div>\n                </div>\n                <span class="controls__total-time">0:00</span>\n            </div>\n    \n            <div class="volume">\n                <div class="volume__button">\n                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n                        <path class="volume__speaker" fill="#566574" fill-rule="evenodd" d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z"/>\n                    </svg>\n                </div>\n                <div class="volume__controls hidden">\n                    <div class="volume__slider slider" data-direction="vertical">\n                        <div class="volume__progress gap-progress">\n                            <div class="pin volume__pin" data-method="changeVolume"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <div class="download" >\n                <a class="download__link" href="" download="">\n                    <svg width="24" height="24" fill="#566574" enable-background="new 0 0 29.978 29.978" version="1.1" viewBox="0 0 29.978 29.978" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">\n                        <path d="m25.462 19.105v6.848h-20.947v-6.848h-4.026v8.861c0 1.111 0.9 2.012 2.016 2.012h24.967c1.115 0 2.016-0.9 2.016-2.012v-8.861h-4.026z"/>\n                        <path d="m14.62 18.426l-5.764-6.965s-0.877-0.828 0.074-0.828 3.248 0 3.248 0 0-0.557 0-1.416v-8.723s-0.129-0.494 0.615-0.494h4.572c0.536 0 0.524 0.416 0.524 0.416v8.742 1.266s1.842 0 2.998 0c1.154 0 0.285 0.867 0.285 0.867s-4.904 6.51-5.588 7.193c-0.492 0.495-0.964-0.058-0.964-0.058z"/>\n                    </svg>\n                </a>\n            </div>\n        '
          }
        }, {
          key: "formatTime",
          value: function(e) {
            var t = Math.floor(e / 60),
              n = Math.floor(e % 60);
            return "".concat(t, ":").concat(n < 10 ? "0".concat(n) : n)
          }
        }, {
          key: "pausePlayer",
          value: function(e) {
            e.parentElement.querySelector(".play-pause-btn__icon").attributes.d.value = "M18 12L0 24V0", e.pause()
          }
        }, {
          key: "playPlayer",
          value: function(e) {
            e.parentElement.querySelector(".play-pause-btn__icon").attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z", e.play()
          }
        }, {
          key: "stopOtherPlayers",
          value: function() {
            for (var e = document.querySelectorAll(".green-audio-player audio"), t = 0; t < e.length; t++) a.pausePlayer(e[t])
          }
        }], (t = [{
          key: "initEvents",
          value: function() {
            var e = this,
              r = this;
            r.audioPlayer.addEventListener("mousedown", function(e) {
              if (r.isDraggable(e.target)) {
                r.currentlyDragged = e.target;
                var t = r.currentlyDragged.dataset.method,
                  n = r[t].bind(r);
                window.addEventListener("mousemove", n, !1), window.addEventListener("mouseup", function() {
                  r.currentlyDragged = !1, window.removeEventListener("mousemove", n, !1)
                }, !1)
              }
            }), r.audioPlayer.addEventListener("touchstart", function(e) {
              if (r.isDraggable(e.target)) {
                var t = o(e.targetTouches, 1);
                r.currentlyDragged = t[0];
                var n = r.currentlyDragged.target.dataset.method,
                  i = r[n].bind(r);
                window.addEventListener("touchmove", i, !1), window.addEventListener("touchend", function() {
                  r.currentlyDragged = !1, window.removeEventListener("touchmove", i, !1)
                }, !1), e.preventDefault()
              }
            }), this.playPauseBtn.addEventListener("click", this.togglePlay.bind(r)), this.player.addEventListener("timeupdate", this.updateProgress.bind(r)), this.player.addEventListener("volumechange", this.updateVolume.bind(r)), this.player.addEventListener("loadedmetadata", function() {
              e.totalTime.textContent = a.formatTime(r.player.duration)
            }), this.player.addEventListener("seeking", this.showLoadingIndicator.bind(r)), this.player.addEventListener("seeked", this.hideLoadingIndicator.bind(r)), this.player.addEventListener("canplay", this.hideLoadingIndicator.bind(r)), this.player.addEventListener("ended", function() {
              a.pausePlayer(r.player), r.player.currentTime = 0
            }), this.volumeBtn.addEventListener("click", function() {
              r.volumeBtn.classList.toggle("open"), r.volumeControls.classList.toggle("hidden")
            }), window.addEventListener("resize", r.directionAware.bind(r)), window.addEventListener("scroll", r.directionAware.bind(r));
            for (var t = 0; t < this.sliders.length; t++) {
              var n = this.sliders[t].querySelector(".pin");
              this.sliders[t].addEventListener("click", r[n.dataset.method].bind(r))
            }
            this.downloadLink.addEventListener("click", this.downloadAudio.bind(r))
          }
        }, {
          key: "overcomeIosLimitations",
          value: function() {
            (window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i)) && (this.player.addEventListener("loadedmetadata", this.hideLoadingIndicator.bind(this)), this.audioPlayer.querySelector(".volume").style.display = "none", this.audioPlayer.querySelector(".controls").style.marginRight = "0")
          }
        }, {
          key: "isDraggable",
          value: function(e) {
            var t = !1;
            if (void 0 === e.classList) return !1;
            for (var n = 0; n < this.draggableClasses.length; n++) e.classList.contains(this.draggableClasses[n]) && (t = !0);
            return t
          }
        }, {
          key: "inRange",
          value: function(e) {
            var t = "touches" in e,
              n = this.getRangeBox(e),
              i = n.getBoundingClientRect(),
              r = null,
              a = null;
            if ("horizontal" === n.dataset.direction) {
              a = (r = i.x) + i.width;
              var o = t ? e.touches[0].clientX : e.clientX;
              if (o < r || a < o) return !1
            } else {
              a = (r = i.top) + i.height;
              var s = t ? e.touches[0].clientY : e.clientY;
              if (s < r || a < s) return !1
            }
            return !0
          }
        }, {
          key: "updateProgress",
          value: function() {
            var e = this.player.currentTime,
              t = e / this.player.duration * 100;
            this.progress.style.width = "".concat(t, "%"), this.currentTime.textContent = a.formatTime(e)
          }
        }, {
          key: "updateVolume",
          value: function() {
            this.volumeProgress.style.height = "".concat(100 * this.player.volume, "%"), .5 <= this.player.volume ? this.speaker.attributes.d.value = "M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" : this.player.volume < .5 && .05 < this.player.volume ? this.speaker.attributes.d.value = "M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z" : this.player.volume <= .05 && (this.speaker.attributes.d.value = "M0 7.667v8h5.333L12 22.333V1L5.333 7.667")
          }
        }, {
          key: "getRangeBox",
          value: function(e) {
            var t = e.target,
              n = this.currentlyDragged;
            return "click" === e.type && this.isDraggable(e.target) && (t = e.target.parentElement.parentElement), "mousemove" === e.type && (t = n.parentElement.parentElement), "touchmove" === e.type && (t = n.target.parentElement.parentElement), t
          }
        }, {
          key: "getCoefficient",
          value: function(e) {
            var t = "touches" in e,
              n = this.getRangeBox(e),
              i = n.getBoundingClientRect(),
              r = 0;
            if ("horizontal" === n.dataset.direction) r = ((t ? e.touches[0].clientX : e.clientX) - i.left) / i.width;
            else if ("vertical" === n.dataset.direction) {
              var a = i.height;
              r = 1 - ((t ? e.touches[0].clientY : e.clientY) - i.top) / a
            }
            return r
          }
        }, {
          key: "rewind",
          value: function(e) {
            this.inRange(e) && (this.player.currentTime = this.player.duration * this.getCoefficient(e))
          }
        }, {
          key: "changeVolume",
          value: function(e) {
            this.inRange(e) && (this.player.volume = Math.round(10 * this.getCoefficient(e)) / 10)
          }
        }, {
          key: "togglePlay",
          value: function() {
            this.player.paused ? (this.stopOthersOnPlay && a.stopOtherPlayers(), a.playPlayer(this.player)) : a.pausePlayer(this.player)
          }
        }, {
          key: "showLoadingIndicator",
          value: function() {
            this.playPauseBtn.style.display = "none", this.loading.style.display = "block"
          }
        }, {
          key: "hideLoadingIndicator",
          value: function() {
            this.playPauseBtn.style.display = "block", this.loading.style.display = "none"
          }
        }, {
          key: "showDownload",
          value: function() {
            this.download.style.display = "block"
          }
        }, {
          key: "downloadAudio",
          value: function() {
            var e = this.player.currentSrc,
              t = e.split("/").reverse()[0];
            this.downloadLink.setAttribute("href", e), this.downloadLink.setAttribute("download", t)
          }
        }, {
          key: "directionAware",
          value: function() {
            this.volumeControls.classList.remove("top", "middle", "bottom"), window.innerHeight < 250 ? this.volumeControls.classList.add("middle") : this.audioPlayer.getBoundingClientRect().top < 180 ? this.volumeControls.classList.add("bottom") : this.volumeControls.classList.add("top")
          }
        }]) && i(e.prototype, t), n && i(e, n), a
      }();
      n.default = r
    }, {}]
  }, {}, [1])(1)
});