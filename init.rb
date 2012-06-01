require 'bundler'
Bundler.require

Sequel.connect('sqlite://db/settings.sqlite3')

$LOAD_PATH << File.expand_path('..', __FILE__)
require 'lib/setting'
require 'lib/vacation'
