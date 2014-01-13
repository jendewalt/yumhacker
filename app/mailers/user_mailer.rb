class UserMailer < ActionMailer::Base
  default from: 'jen@yumhacker.com'

  def registration_confirmation(user)
    mail(to: user.email, subject: 'Email is Awesome!')
  end

  def new_followers(user)
    @user = user

    subject = if @user.followers.length > 1
      "You have #{@user.followers.length} new followers"
    else
      'You have a new follower'
    end
    mail(to: "#{@user.first_name} #{@user.last_name} <#{@user.email}>", subject: subject)
  end

end
