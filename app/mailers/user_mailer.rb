class UserMailer < ActionMailer::Base
  default from: 'YumHacker <jen@yumhacker.com>'

  def new_followers(user)
    @user = user

    subject = if @user.followers.length > 1
      "You have #{@user.followers.length} new followers on YumHacker"
    else
      'You have a new follower on YumHacker'
    end
    mail(to: "#{@user.first_name} #{@user.last_name} <#{@user.email}>", subject: subject)
  end

  def new_favorites(list)
    @list = list
    @user = list.user

    subject = if @list.favorited_by.length > 1
      "#{@user.followers.length} people have favorited your list on YumHacker"
    else
      'A new person has favorited your list on YumHacker'
    end
    mail(to: "#{@user.first_name} #{@user.last_name} <#{@user.email}>", subject: subject)
  end

end
