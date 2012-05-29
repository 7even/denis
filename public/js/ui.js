var ui = {
  month_names: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  
  weekday_names: [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс'
  ],
  
  base_date: new Date(2012, 4, 26),
  milliseconds_in_day: 1000 * 60 * 60 * 24,
  
  vacations: [
    [
      new Date(2012, 5, 8),
      new Date(2012, 5, 23)
    ]
  ],
  
  // Render the Calendar
  renderCalendar: function(current_month, current_year) {
    // HTML renderers
    var _html = '';
    var id = '';
    
    // Create current date object
    var now = new Date();
    
    // Defaults
    if(arguments.length == 0) {
      current_month = now.getMonth();
      current_year  = now.getFullYear();
    }
    
    // Render year and month
    $('.year').html(current_year);
    $('.month').html(this.month_names[current_month]);
    
    // Create viewed date object
    var this_month = new Date(current_year, current_month, 1);
    var prev_month = new Date(current_year, current_month - 1, 1);
    var next_month = new Date(current_year, current_month + 1, 1);
    
    // Days in Month
    var days_in_months = [
      31,
      (current_year % 4 == 0) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ];
    
    // First weekday of month
    var first_weekday_of_month = this_month.getDay();
    if(first_weekday_of_month == 0) {
      first_weekday_of_month = 6;
    } else {
      first_weekday_of_month--;
    }
    
    // Last day of month
    var last_day_of_month = days_in_months[this_month.getMonth()];
    
    // Clear view
    var thead = $('#calendar > thead:last');
    var tbody = $('#calendar > tbody:last');
    
    thead.empty();
    tbody.empty();
    
    // Render Days of Week
    for(var weekday = 0; weekday < this.weekday_names.length; weekday++) {
      _html += '<th>' + this.weekday_names[weekday] + '</th>';
    }
    _html = '<tr>' + _html + '</tr>';
    thead.append(_html);
    
    // Render days
    var current_day = 0;
    var first_day_encountered = false;
    var last_day_encountered = false;
    
    for(var week = 0; !last_day_encountered; week++) {
      _html = '';
      
      for(var weekday = 0; weekday < this.weekday_names.length; weekday++) {
        // Check first day of month
        if(weekday == first_weekday_of_month) {
          first_day_encountered = true;
        }
        
        if(first_day_encountered && !last_day_encountered) {
          current_day++;
        } else {
          current_day = 0;
        }
        
        // Check last day of month
        if(current_day == last_day_of_month) {
          last_day_encountered = true;
        }
        
        // Set classes
        var classes = [];
        if(
          current_day == now.getDate()
          && now.getMonth() == this_month.getMonth()
          && now.getFullYear() == this_month.getFullYear()
        ) {
          classes.push('today');
        } else if(weekday == 5 || weekday == 6) {
          classes.push('weekend');
        }
        
        var day = new Date(current_year, current_month, current_day);
        if(this.dayIsOnVacation(day)) {
          classes.push('vacation');
        } else if(this.dayIsWorking(day)) {
          classes.push('working');
        }
        
        // Set ID
        id = 'cell_' + week + '_' + weekday + '_' + current_day;
        
        // Render HTML
        if(current_day == 0) {
          _html += '<td>&nbsp;</td>';
        } else {
          _html += '<td class="' + classes.join(' ') + '" id="' + id + '">' + current_day + '</td>';
        }
      }
      
      _html = '<tr>' + _html + '</tr>';
      tbody.append(_html);
    }
    
    $('#prev').unbind('click').bind('click', function() {
      ui.renderCalendar(prev_month.getMonth(), prev_month.getFullYear());
    });
    
    // $('#current').unbind('click').bind('click', function() {
    //   ui.renderCalendar(now.getMonth(), now.getFullYear());
    // });
    
    $('#next').unbind('click').bind('click', function() {
      ui.renderCalendar(next_month.getMonth(), next_month.getFullYear());
    });
  },
  
  // Render Clock
  renderTime: function() {
    var now = new Date();
    
    var hours = now.getHours();
    var minutes = now.getMinutes();
    
    // Zero padding
    if((minutes + '').length == 1) {
      minutes = '0' + minutes;
    }
    
    var separator = ':';
    var previous_time = $('.time').text();
    
    // Blinking colon
    if(previous_time.indexOf(':') != -1) {
      separator = ' ';
    } else {
      separator = ':'
    };
    
    $('.time').html(
      hours + separator + minutes
    );
    
    setTimeout(function() {
      ui.renderTime();
    }, 500);
  },
  
  dayIsOnVacation: function(day) {
    var day_is_on_vacation = false;
    $(this.vacations).each(function(index, vacation) {
      if(vacation[0] <= day && day <= vacation[1]) {
        day_is_on_vacation = true;
      }
    });
    
    return day_is_on_vacation;
  },
  
  dayIsWorking: function(day) {
    var days_since_base_date = (day - this.base_date) / this.milliseconds_in_day;
    days_since_base_date = Math.ceil(days_since_base_date);
    var cycle_position = days_since_base_date % 4;
    
    if(cycle_position == -3 || cycle_position == 0 || cycle_position == 1) {
      return true;
    } else {
      return false
    }
  },
  
  // Initialization
  init: function() {
    
  }
};

// Initialize
ui.init();

// Load
$(document).ready(function() {
  // Render the calendar
  ui.renderCalendar();
  
  // Render the time
  ui.renderTime();
});
