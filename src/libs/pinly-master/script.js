(function ($, window, document, undefined) {
  // --- BEGIN PLUGIN --- version 1.2

  let flag2 = true;
  var // plugin name
    pluginName = "pinly",
    // key using in $.data()
    dataKey = "plugin_" + pluginName;

  // Adds pinly input fields
  var _BuildDataModel = function (obj, numberOfFields, inputName) {
    var pinly_input;

    for (i = 0; i < 8; i++) {
      pinly_input = $(
        '<input type="number" class="' +
          inputName +
          '" pattern="[0-9]*" min="0" max="9" alt="Your browser does not support javascript" data="' +
          i +
          '" >'
      );

      obj.addClass("pinly-wrap").append(pinly_input);
    }

    for (i = 8; i < 10; i++) {
      pinly_input = $(
        '<input type="number" class="' +
          inputName +
          '" pattern="[0-9]*" min="0" max="9" alt="Your browser does not support javascript" data="' +
          i +
          '">'
      );

      obj.addClass("pinly-wrap").append(pinly_input);
    }
  };

  // Private: determine if key pressed was
  var _ValidateInput = function (obj, max, e) {
    if (
      isNaN(String.fromCharCode(e.charCode)) || // Invalid if not a numeric character
      obj.val().length === max || // Invalid if not a single digit number
      e.which === 13 || // Invalid if carriage return key
      e.which === 32 // Invalid if space key
    ) {
      e.preventDefault();
      return false;
    } else {
      return true;
    }
  };

  // Private get pin & post
  var _ProcessPIN = function (obj, selector, max, login_success) {
    var PIN = "";

    $.each($("." + selector, obj), function () {
      PIN += $(this).val();
    });

    // If PIN value is max number of inputs then hide keyboard(mobile) & POST data
    if (PIN.length === max) {
      // Check PIN
      login_success(PIN);
    }
  };

  // Private Determine input movement
  var _DetermineMovement = function (obj, class_name, direction) {
    var e = $("." + class_name),
      current_pos = parseInt(obj.attr("data")),
      move = current_pos,
      num_points = e.length - 1;

    let flag = false;
    // Determine direction
    if (direction === true) {
      if (current_pos == num_points) {
        flag = true;
      } else if (flag2) {
        console.log(flag2);
        move = 0;
        flag2 = false;
        console.log("sdsd");
      } else move++;
    } else if (direction === false) {
      if (e.is(":first")) move = num_points;
      else move--;
    } else if (direction === "reset") {
      move = 0;
    }

    // Move to calculated position
    //$("#ip-input").focus();
    if (!flag) {
      e.eq(move).focus();
    } else $("#ip-input").focus();
  };

  // Plugin settings/options
  var Plugin = function (element, options) {
    this.element = element;

    this.options = {
      num_inputs: 10,
      input_name: "pinly-point",
      highlight: "pinly-highlight",
      on_pass: "pinly-accepted",
      on_pass_hide: 600,
      login_success: function () {},
    };

    /*
     * Initialization
     */

    this.init(options);
  };

  Plugin.prototype = {
    // initialize options
    init: function (options) {
      $.extend(this.options, options);
      var obj,
        charStatus,
        t,
        save, // Holds the value of the currently selected input
        plugin = this;

      // Add pinly elements to DOM
      _BuildDataModel(
        plugin.element,
        plugin.options.num_inputs,
        plugin.options.input_name
      );

      // Prevent default actions and bubbling on keydown
      $("." + plugin.options.input_name, plugin.element).on({
        keydown: function (e) {
          // Disable TAB
          var charCodes = [0, 8, 9, 16, 37, 39]; // tab, bksp, shft, la, ra

          charCodes.forEach(function (value) {
            if (e.which === value) e.preventDefault();
          });
        },

        keyup: function (e) {
          obj = $(this);

          // Define movement directions, shift OR left arrow moves left to right
          if (e.which === 16 || e.which === 37) {
            e.preventDefault();

            _DetermineMovement(obj, plugin.options.input_name, false);

            // tab (no shift) OR right arrow moves right to left
          } else if ((!e.shiftKey && e.which === 9) || e.which === 39) {
            e.preventDefault();

            _DetermineMovement(obj, plugin.options.input_name, true);
          } else if (e.which === 8) {
            e.preventDefault();

            // Check if backspace was pressed on input
            if (
              $("." + plugin.options.highlight).length ===
              $("." + plugin.options.input_name).length
            ) {
              $("." + plugin.options.input_name)
                .removeClass(plugin.options.highlight)
                .val(0);
              _DetermineMovement(obj, plugin.options.input_name, "reset");
            } else if (obj.prev().hasClass(plugin.options.input_name)) {
              _DetermineMovement(obj, plugin.options.input_name, false);
            }
          } else if (charStatus === true) {
            // Move forward if key is valid (i.e. a number)
            if (
              obj.next().hasClass(plugin.options.input_name) &&
              obj.next().length !== 0
            )
              _DetermineMovement(obj, plugin.options.input_name, true);

            // Update PIN
            _ProcessPIN(
              plugin.element,
              plugin.options.input_name,
              plugin.options.num_inputs,
              plugin.options.login_success
            );
          }
        },

        // Check if valid character has been entered, returns true if valid
        keypress: function (e) {
          obj = $(this);
          charStatus = _ValidateInput(obj, 1, e);
        },

        // On focus set the value to null and select so that input can be achieved
        focus: function () {
          save = $(this).val();

          $(this).addClass(plugin.options.highlight).val("");
        },

        // When focus is lost and value is null reset to 0
        focusout: function () {
          $(this).removeClass(plugin.options.highlight);

          if ($(this).val() === "") $(this).val(save);
        },
      });

      // Listen for pinly custom events fired after PIN is validated
      plugin.element.on({
        pinlyFail: function (e) {
          $("." + plugin.options.input_name, plugin.element).addClass(
            plugin.options.highlight
          );
        },

        pinlyPass: function (e) {
          // Remove keyboard on mobile
          document.activeElement.blur();

          $("." + plugin.options.input_name)
            .addClass(plugin.options.on_pass)
            .fadeOut(plugin.options.on_pass_hide);
        },
      });
    }, // </init>
  };

  /*
   * Plugin wrapper, preventing against multiple instantiations and
   * return plugin instance.
   */
  $.fn[pluginName] = function (options) {
    var plugin = this.data(dataKey);

    // has plugin instantiated ?
    if (plugin instanceof Plugin) {
      // if have options arguments, call plugin.init() again
      if (typeof options !== "undefined") {
        plugin.init(options);
      }
    } else {
      plugin = new Plugin(this, options);
      this.data(dataKey, plugin);
    }

    return plugin;
  };
})(jQuery, window, document);

// Call plugin instance
$(".pin-login").pinly({
  num_inputs: 10,
  on_pass_hide: 200,
});
