"use strict";

/*****************

Create image selection questions

******************/



function selectImage() {

  $imgSelect.selectable({
    stop: function() {
      console.log($(this));
      $(this).children().not('.ui-selected').addClass('overlay');
      $(this).selectable('disable');
    }
  });

}
