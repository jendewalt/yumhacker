class UserMailer < ActionMailer::Base
  default from: 'jen@yumhacker.com'

  def registration_confirmation(user)
    mail(to: user.email, subject: 'Email is Awesome!')
  end

  def new_followers(user_id, followers)
    if User.exists?(user_id)
      @user = User.find(user_id)
      @followers = User.where(id: followers)

      if @user && @followers.length > 0
        subject = if @followers.length > 1
          "You have #{@followers.length} new followers"
        else
          'You have a new follower'
        end
        mail(to: "#{@user.first_name} #{@user.last_name} <#{@user.email}>", subject: subject)
      end
    end
  end

end
