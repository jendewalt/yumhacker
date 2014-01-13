class TwitterController < ApplicationController
  def sign_up
    @user = User.new({
      first_name: params[:auth][:first_name],
      last_name: params[:auth][:last_name],
      location: params[:auth][:location],
      uid: params[:auth][:uid]
    })
    @avatar = params[:auth][:avatar]
  end

  def update
    user = User.new({ first_name: params[:user][:first_name],
                      last_name: params[:user][:last_name],
                      location: params[:user][:location],
                      provider:'twitter',
                      uid: params[:user][:uid],
                      email: params[:user][:email],
                      password: Devise.friendly_token[0,20]
           })    
    begin
      user.avatar = URI.parse(params[:user][:avatar])
      user.save
      user.automatic_relationships!
    rescue
    end

    if user.save
      sign_in_and_redirect user, :event => :authentication
    else
      flash[:error] = 'Sorry, that email is already taken.'
      redirect_to :back
    end
  end
end
