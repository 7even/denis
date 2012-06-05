var settings = {
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
