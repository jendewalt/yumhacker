class Api::FollowersController < ApplicationController
  respond_to :json

  def index
    @followers = User.find(params[:user_id]).followers
  end
end
