var admin = {
  addDay: function() {
    this.days.push(0);
    this.renderSchedule();
  },
  
  removeDay: function() {
    this.days.pop();
    this.renderSchedule();
  },
  
  toggleDay: function(day_index) {
    if(this.days[day_index] == 0) {
      this.days[day_index] = 1;
    } else if(this.days[day_index] == 1) {
      this.days[day_index] = 0;
    }
    
    this.renderSchedule();
  },
  
  clearSchedule: function() {
    $('#schedule .day').remove();
  },
  
  renderSchedule: function() {
    this.clearSchedule();
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
  
  renderVacations: function() {
    var tbody = $('#vacations tbody');
    $(this.vacations).each(function(index, vacation) {
      var tr = '<td><input type="text" value="' + vacation[0] + '"></td>';
      tr    += '<td><input type="text" value="' + vacation[1] + '"></td>';
      tr    += '<td><button class="btn btn-danger"><i class="icon-trash icon-white"></i></button></td>';
      tr     = '<tr>' + tr + '</tr>';
      tbody.append(tr);
    });
    
    tbody.find('input').datepicker({
      format:    'dd.mm.yyyy',
      weekStart: 1,
      autoclose: true,
      language:  'ru'
    });
  },
  
  loadAndRender: function() {
    settings.load(function() {
      admin.days = settings.schedule;
      admin.renderSchedule();
      
      var datepicker = $('#datepicker');
      datepicker.val(settings.formattedBaseDate());
      datepicker.datepicker('update');
      
      admin.vacations = settings.formattedVacations();
      admin.renderVacations();
    });
  },
  
  save: function() {
    var data = {
      base_date: $('#datepicker')[0].value,
      days:      this.days
    };
    
    $.post('/settings.json', data);
  }
};
