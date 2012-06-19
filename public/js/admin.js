var admin = {
  addDay: function() {
    this.days.push(0);
    this.render();
  },
  
  removeDay: function() {
    this.days.pop();
    this.render();
  },
  
  toggleDay: function(day_index) {
    if(this.days[day_index] == 0) {
      this.days[day_index] = 1;
    } else if(this.days[day_index] == 1) {
      this.days[day_index] = 0;
    }
    
    this.render();
  },
  
  clear: function() {
    $('.day').remove();
  },
  
  render: function() {
    this.clear();
    var last_button = $('#add_day');
    
    $(this.days).each(function(index, day) {
      var button_html;
      if(day == 0) {
        // выходной
        button_html = '<input id="' + index + '" class="day btn" type="button" value="' + (index + 1) + '">';
      } else {
        // рабочий
        button_html = '<input id="' + index + '" class="day btn btn-inverse" type="button" value="' + (index + 1) + '">';
      }
      
      $(button_html).insertBefore(last_button);
    });
  },
  
  loadAndRender: function() {
    settings.load(function() {
      admin.days = settings.schedule;
      admin.render();
    });
  },
  
  save: function() {
    var data = {
      days: this.days
    };
    
    $.post('/settings.json', data);
  }
};
