class Setting < Sequel::Model
  set_primary_key :name
  unrestrict_primary_key
  
  class << self
    def base_date
      self[name: 'base_date'].value
    end
    
    def base_date=(new_date)
      if self.filter(name: 'base_date').count.zero?
        self.create(name: 'base_date', value: new_date)
      else
        self[name: 'base_date'].update(value: new_date)
      end
    end
    
    def schedule
      self[name: 'schedule'].value.split(',').map(&:to_i)
    end
    
    def schedule=(days)
      new_schedule = days.join(',')
      
      if self.filter(name: 'schedule').count.zero?
        self.create(name: 'schedule', value: new_schedule)
      else
        self[name: 'schedule'].update(value: new_schedule)
      end
    end
    
    def to_hash
      {
        base_date:  base_date,
        schedule:   schedule
      }
    end
  end
end
