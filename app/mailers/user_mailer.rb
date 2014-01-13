class UserMailer < ActionMailer::Base
  default from: 'jen@yumhacker.com'

  def registration_confirmation(user)
    mail(to: user.email, subject: 'Email is Awesome!')
  end

  def new_followers(user)
    @user = user

    subject = if @user.followers.length > 1
      "You have #{@user.followers.length} new followers on YumHacker"
    else
      'You have a new follower on YumHacker'
    end
    mail(to: "#{@user.first_name} #{@user.last_name} <#{@user.email}>", subject: subject)
  end

end
