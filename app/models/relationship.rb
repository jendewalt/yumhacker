class Relationship < ActiveRecord::Base
  belongs_to :follower, :class_name => 'User'
  belongs_to :followed, :class_name => 'User'

  validates :followed_id, :presence => true
  validates :follower_id, :presence => true

  after_save :add_to_mongo
  after_destroy :remove_from_mongo

  private  
   def add_to_mongo
      users = $mongo['users']
      user = users.find('user_id' => followed_id).to_a.first
      if user
        followers = user['new_followers']
        unless followers.include?(follower_id)
          users.update({ 'user_id' => followed_id }, { '$set' => { 'new_followers' => followers + [follower_id] }})
        end
      else
        doc = { 'user_id' => followed_id, 'new_followers' => [follower_id] }
        users.insert(doc)
      end
    end

    def remove_from_mongo
      users = $mongo['users']
      user = users.find('user_id' => followed_id).to_a.first
      if user
        followers = user['new_followers']
        if followers.include?(follower_id)
          followers.delete(follower_id)
          users.update({ 'user_id' => followed_id }, { '$set' => { 'new_followers' => followers }})
        end
      end
    end

end
