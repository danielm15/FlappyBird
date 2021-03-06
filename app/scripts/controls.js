
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        77: 'm'
    };

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */


    var Controls = function() {
        this._didJump = false;
        this.keys = {};
        this.volumeOn = false;
        this.HelicopterSound = new Audio('../audio/HelicopterSound.mp3');
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this));
    };

    Controls.prototype._onKeyDown = function(e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
            this.HelicopterSound.play();
        }
        if (e.keyCode === 77) {
            if(this.volumeOn) {
                this.volumeOn = false;
                this.HelicopterSound.volume = 1;
            }
            else {
                this.volumeOn = true;
                this.HelicopterSound.volume = 0;
            }
        }
        // Remember that this button is down.
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;
            return false;
        }
    };

    Controls.prototype._onKeyUp = function(e) {
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
    };

    Controls.prototype.isVolumeOn = function() {
        return this.volumeOn;
    };
    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };

    // Export singleton.
    return new Controls();
})();
