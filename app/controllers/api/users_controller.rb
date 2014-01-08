class Api::UsersController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :except => [:index, :show, :followed_users, :followers, :endorsements, :search, :following, :endorsing]
  
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
    @followers = User.find(params[:user_id]).followers.order("last_name ASC")
  end

  def followed_users
    @followed_users = User.find(params[:user_id]).followed_users.order("last_name ASC")
  end

  def unendorse
    current_user.unendorse!(params[:establishment_id])
    render :json => { user_endorsing: current_user.endorsing?(params[:establishment_id]) }
  end

  def endorse
    current_user.endorse!(params[:establishment_id])
    render :json => { user_endorsing: current_user.endorsing?(params[:establishment_id]) } 
  end

  def endorsements
    page = params[:page] || 1
    lat = params[:lat] || 37.7749295
    lng = params[:lng] || -122.4194155

    @establishments = User.find(params[:user_id]).establishments.order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry").page(page).per(10)

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
  end

   def find_facebook_friends
    logger.debug('@@@@@@@@@@@@@@@@@@@@@@@@@')
    @user = current_user

    unless @user.token.nil?
      token = @user.token

      @graph = Koala::Facebook::API.new(token)
      fb_friends = @graph.get_connections("me", "friends")
      ids = []

      fb_friends.each do |friend| 
        ids.push(friend['id'])
      end

      @friends = User.where(:uid => ids, :provider => 'facebook')
      logger.debug(@friends.inspect)
    end
  end
end
