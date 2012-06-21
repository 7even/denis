var settings = {
  formattedBaseDate: function() {
    return this.formatDate(this.base_date);
  },
  
  formattedVacations: function() {
    var vacations = [];
    $(this.vacations).each(function(i, vacation) {
      var start = settings.formatDate(vacation[0]);
      var end   = settings.formatDate(vacation[1]);
      vacations.push([start, end]);
    });
    
    return vacations;
  },
  
  load: function(callback) {
    var self = this;
    
    $.getJSON('/settings.json', function(result) {
      self.schedule  = result.settings.schedule;
      self.base_date = self.parseDate(result.settings.base_date);
      
      self.vacations = [];
      $(result.vacations).each(function(index, vacation) {
        var start = self.parseDate(vacation.start);
        var end   = self.parseDate(vacation.end);
        self.vacations.push([start, end]);
      });
      
      callback();
    });
  },
  
  parseDate: function(date_string) {
    var date_array = date_string.split('-');
    return new Date(date_array[0], date_array[1] - 1, date_array[2]);
  },
  
  formatDate: function(date) {
    var day = date.getDate();
    day = (day < 10 ? '0' : '') + day;
    
    var month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;
    
    var year = date.getFullYear();
    
    return [day, month, year].join('.');
  }
};
