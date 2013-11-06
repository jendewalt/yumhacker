class Api::UsersController < ApplicationController
  respond_to :json
  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def unfollow
    current_user.unfollow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def follow
    current_user.follow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def followers
    @followers = User.find(params[:user_id]).followers
  end

  def followed_users
    @followed_users = User.find(params[:user_id]).followed_users
  end

  def following
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def unendorse
    logger.debug('$$$$$$$$$$$$$$$$$$')
    logger.debug(params[:establishment_id])
    current_user.unendorse!(params[:establishment_id])
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) }
  end

  def endorse
    current_user.endorse!(params[:establishment_id])
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) } 
  end

  def endorsing
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) }
  end
end
