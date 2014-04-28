namespace :email do
  desc 'Send daily email to users with new followers'
  task :new_followers => :environment do

    new_followed_users = User.includes(:followers).where('relationships.created_at > ? AND relationships.created_at <= ?', Time.now.utc.midnight + 13.hours - 1.day, Time.now.utc.midnight + 13.hours).references(:relationships)

    new_followed_users.each do |user| 
      UserMailer.new_followers(user).deliver
    end
  end

  desc 'Send daily email to users whose lists have been favorited'
  task :new_favorites => :environment do

    lists_with_new_favoritizations = List.includes(:favorited_by).where('favoritizations.created_at > ? AND favoritizations.created_at <= ?', Time.now.utc.midnight + 13.hours - 1.day, Time.now.utc.midnight + 13.hours).references(:favoritizations)

    lists_with_new_favoritizations.each do |list| 
      UserMailer.new_favorites(list).deliver
    end
  end

  desc 'Send new features update email'
  task :new_features_update => :environment do
      users = User.all
      users.each do |user|
        UserMailer.new_features_update(user).deliver
      end
  end

end
