require 'sequel'

desc 'Create the database structure and seed with some data'
task :install do
  db = Sequel.connect('sqlite://db/settings.sqlite3')
  
  db.create_table! :vacations do
    primary_key :id
    Date :start
    Date :end
  end
  
  db.create_table! :settings do
    primary_key :name
    String :name
    String :value
  end
  
  require './init'
  
  Setting.base_date = Date.new(2012, 5, 26)
  Setting.schedule = [1, 1, 0, 0]
  
  Vacation.create start: Date.new(2012, 6, 8), end: Date.new(2012, 6, 23)
end
