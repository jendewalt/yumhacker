class UsersController < ApplicationController
  def index
    @users = User.all.order(:last_name).page(params[:page]).per(1000)
  end
end