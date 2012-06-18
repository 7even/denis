var admin = {
  render: function() {
    var last_button = $('#add_day');
    $(settings.schedule).each(function(index, day) {
      var button_html;
      if(day == 0) {
        // выходной
        button_html = '<input class="btn" type="button" value="' + (index + 1) + '">';
      } else {
        // рабочий
        button_html = '<input class="btn btn-inverse" type="button" value="' + (index + 1) + '">';
      }
      
      $(button_html).insertBefore(last_button);
    });
  },
  
  loadAndRender: function() {
    settings.load(function() {
      admin.render();
    });
  }
};
