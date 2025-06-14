defmodule RemoteRackBackend.Repo do
  use Ecto.Repo,
    otp_app: :remote_rack_backend,
    adapter: Ecto.Adapters.Postgres
end
