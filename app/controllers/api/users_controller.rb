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

  def endorsements
    page = params[:page] || 1

    @establishments = User.find(params[:user_id]).establishments.page(page).per(2)
    render 'api/establishments/index'
  end

  def search
    email = params[:email]
    first_name = params[:first_name]
    last_name = params[:last_name]
    @users

    if email && !email.strip.empty? || first_name && !first_name.strip.empty? || last_name && !last_name.strip.empty?
      wild_email = email.blank? ? nil : "%#{email.downcase.gsub(/\s+/, '%')}%"
      wild_first_name = first_name.blank? ? nil : "%#{first_name.downcase.gsub(/\s+/, '%')}%"
      wild_last_name = last_name.blank? ? nil : "%#{last_name.downcase.gsub(/\s+/, '%')}%"

      @users = User.where('LOWER(email) LIKE ? or LOWER(first_name) LIKE ? or LOWER(last_name) LIKE ?', wild_email, wild_first_name, wild_last_name).limit(10)
    end


    logger.debug(@users.inspect)
  end
end
