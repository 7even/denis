$LOAD_PATH << File.expand_path('..', __FILE__)
require 'init'

run Sinatra::Application
