var settings = {
  base_date_str: function() {
    var day = this.base_date.getDate();
    day = (day < 10 ? '0' : '') + day;
    
    var month = this.base_date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;
    
    var year = this.base_date.getFullYear();
    
    return [day, month, year].join('.');
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
  }
};
