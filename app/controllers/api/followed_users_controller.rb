class Api::FollowersController < ApplicationController
  respond_to :json

  def index
    @followed_users = User.find(params[:user_id]).followed_users
  end
end
