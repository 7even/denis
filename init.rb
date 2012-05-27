Bundler.require
Slim::Engine.set_default_options(pretty: true)

get '/' do
  slim :index
end
