namespace :data do
  require 'csv'
  desc 'Get user email'
  task :user_email => :environment do

    users = User.all.order('created_at desc').map{|u| [u.first_name + ' ' + u.last_name, u.email, u.location, u.created_at]}
    time = Time.new
    file_name = time.month.to_s + time.day.to_s + time.year.to_s + '_all_user_email.csv'

    CSV.open(file_name, 'w') do |csv|
      users.each do |u|
          csv << u
      end 
    end
  end
end
