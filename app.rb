require 'init'

Slim::Engine.set_default_options(pretty: true)

get '/' do
  slim :index
end

get '/settings.json' do
  content_type :json
  {settings: Setting.to_hash, vacations: Vacation.to_hash}.to_json
end

get '/admin' do
  slim :admin
end
