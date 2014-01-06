require 'mongo'
include Mongo

mongo_client = MongoClient.new
$mongo = mongo_client.db('yumhacker')

namespace :email do 
  desc 'Send daily email to users with new followers'
  task :new_followers => :environment do
    users = $mongo['users']
    users.find.each do |user| 
      UserMailer.new_followers(user['user_id'], user['new_followers']).deliver
    end
  end
end

