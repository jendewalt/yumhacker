class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    data = request.env["omniauth.auth"]
    auth = { first_name: data.info.first_name,
             last_name: data.info.last_name,
             provider: data.provider,
             uid: data.uid,
             email: data.info.email,
             image: data.info.image
           }

    @user = User.where(:provider => auth[:provider], :uid => auth[:uid]).first
    
    if @user
      sign_in_and_redirect @user, :event => :authentication
    else
      if request.env['omniauth.origin'].include?('sign_up')
        if User.exists?(:email => auth[:email])
          flash[:error] = 'Sorry, an account with that email has already been created. Perhaps you\'ve already signed up?'
          redirect_to new_user_session_path
        else
          email = ''
          email = auth[:email] if auth[:email] && auth[:email].include?('@')
          user = User.create({ first_name: auth[:first_name],
                               last_name: auth[:last_name],
                               provider: auth[:provider],
                               uid: auth[:uid],
                               email: email,
                               password: Devise.friendly_token[0,20]
                             })
          begin
            user.avatar = URI.parse(auth[:image])
            user.save
          rescue
          end

          if email == ''
            redirect_to facebook_sign_up_path(:uid => auth[:uid])
          else
            sign_in_and_redirect user, :event => :authentication
          end
        end
      else
        redirect_to new_user_registration_url
      end
    end
  end

  def twitter
    auth = request.env["omniauth.auth"]
    @user = User.where(:provider => auth[:provider], :uid => auth[:uid]).first

    if @user
      sign_in_and_redirect @user, :event => :authentication 
    else
      if request.env['omniauth.origin'].include?('sign_up')
        auth = { first_name: auth.info.name.split.first,
                 last_name: auth.info.name.split[1..-1].join(' '),
                 avatar: auth.info.image,
                 uid: auth.uid
               }    
        redirect_to twitter_sign_up_path(:auth => auth)
      else
        redirect_to new_user_registration_url
      end
    end
  end
end
