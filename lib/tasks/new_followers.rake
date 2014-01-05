namespace :email do 
  desc 'Send daily email to users with new followers'
  task :new_followers => :environment do
    puts User.first
  end
end
