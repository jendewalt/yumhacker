class UserMailer < ActionMailer::Base
  default from: 'jen@yumhacker.com'

  def registration_confirmation(user)
    mail(to: user.email, subject: 'Email is Awesome!')
  end

  def new_followers(user, followers)
    @user = user
    @followers = followers
    subject = if followers.count > 1
      'You have #{followers.count} new followers'
    else
      'You have a new follower'
    end
    mail(to: "#{user.name} <#{user.email}>", subject: subject)
  end

end
