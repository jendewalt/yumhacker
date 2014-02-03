namespace :data do
  require 'csv'

  desc 'Get user email'
  task :user_email => :environment do

    users = User.all.order('created_at desc').map{|u| [u.first_name + ' ' + u.last_name, u.email, u.location, u.created_at]}
    time = Time.new
    file_name = time.year.to_s + time.month.to_s + time.day.to_s + '_user_email.csv'

    CSV.open(file_name, 'w') do |csv|
      users.each do |u|
          csv << u
      end 
    end
  end

  desc 'Output weekly stats'
  task :weekly_stats => :environment do
    total_users = User.all.count
    total_estabs = Establishment.all.count
    today = DateTime.now.utc.midnight
    end_of_last_week = today - today.wday # Midnight Sunday UTC

    new_users = User.where('created_at > ?', end_of_last_week).count
    new_estabs = Establishment.where('created_at > ?', end_of_last_week).count
    file_name = today.year.to_s + today.month.to_s + today.day.to_s + '_weekly_stats.csv'

    CSV.open(file_name, 'w') do |csv|
      csv << ['category', 'total', 'new', DateTime.now.utc]
      csv << ['users', total_users, new_users]
      csv << ['estabs', total_estabs, new_estabs]
    end

  end
end
