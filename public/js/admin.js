var admin = {
  render: function() {
    var last_button = $('#add_day');
    $(settings.schedule).each(function(index, day) {
      var button_html = '<input class="btn" type="button" value="' + day + '">';
      $(button_html).insertBefore(last_button);
    });
  },
  
  loadAndRender: function() {
    settings.load(function() {
      admin.render();
    });
  }
};
