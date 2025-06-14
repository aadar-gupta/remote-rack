defmodule RemoteRackBackendWeb.Router do
  use RemoteRackBackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", RemoteRackBackendWeb do
    pipe_through :api
  end
end
