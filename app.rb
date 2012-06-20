require 'init'

Slim::Engine.set_default_options(pretty: true)

get '/' do
  slim :index
end

get '/admin' do
  slim :admin
end

get '/settings.json' do
  content_type :json
  {settings: Setting.to_hash, vacations: Vacation.to_hash}.to_json
end

post '/settings.json' do
  Setting.base_date = Date.parse(params[:base_date])
  Setting.schedule  = params[:days]
  
  content_type :json
  params.to_json
end
