class User < ActiveRecord::Base
  devise :database_authenticatable, :lockable, :registerable,
        :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook, :twitter]

  has_many :relationships, :foreign_key => 'follower_id', :dependent => :destroy
  has_many :followed_users, :through => :relationships, :source => :followed

  has_many :reverse_relationships, :foreign_key => 'followed_id', :class_name => 'Relationship', :dependent => :destroy
  has_many :followers, :through => :reverse_relationships, :source => :follower

  has_many :endorsements, :dependent => :destroy
  has_many :establishments, :through => :endorsements

  has_many :comments, :dependent => :destroy
  has_many :photos, :dependent => :destroy
  has_many :lists, :dependent => :destroy

  has_many :favoritizations, :dependent => :destroy
  has_many :favorite_lists, :through => :favoritizations, :source => :list, :dependent => :destroy

  has_attached_file :avatar, :styles => { :medium => "200x200#", :small => "100x100#", :thumb => "30x30#" }, :default_url => "/default.png"

  extend FriendlyId
  friendly_id :full_name, use: :slugged

  # User following

  def following?(id)
    relationships.where(:followed_id => id).count > 0
  end

  def follow!(ids)
    relationships.create!(:followed_id => ids)
  end

  def follow_all!(ids)
    ids -= [User.first.id.to_s, self.id.to_s]
    ids.map!{ |id| { followed_id: id }}
    relationships.create!(ids)
  end

  def unfollow!(id)
    relationships.where(:followed_id => id).first.try(:destroy)
  end

  # Restaurant endorsing

  def endorsing?(id)
    endorsements.where(:establishment_id => id).count > 0
  end

  def endorse!(id)
    endorsements.create!(:establishment_id => id)
  end

  def unendorse!(id)
    endorsements.where(:establishment_id => id).first.try(:destroy)
  end

  # List favoriting

  def favoriting?(id)
    favoritizations.where(:list_id => id).count > 0
  end

  def favorite!(id)
    favoritizations.create!(:list_id => id)
  end

  def unfavorite!(id)
    favoritizations.where(:list_id => id).first.try(:destroy)
  end

  # Wish Lists

  def wish_list
    lists.where(wish_list: true).first
  end
  
  def wish_listed?(establishment)
    wish_list.nil? ? false : wish_list.establishment_ids.include?(establishment.id) 
  end

  # Misc

  def full_name
    (first_name + ' ' + last_name).strip
  end

  def path
    'users/' + slug
  end

  def get_fb_friends_on_yumhacker
    @graph = Koala::Facebook::API.new(token)
    fb_friends = @graph.get_connections("me", "friends")
    uids = []
    fb_friends.each { |friend| uids.push(friend['id']) }

    return User.where(:uid => uids, :provider => 'facebook')
  end

  def store_fb_friends_in_redis(friends)
    $redis.sadd('user:' + id.to_s, friends)
  end

  def get_fb_friends_from_redis
    $redis.smembers('user:' + id.to_s)
  end

  def remove_fb_friends_from_redis
    $redis.del('user:' + id.to_s)
  end

  def automatic_relationships!
    jen = User.first
    follow!(jen.id);
    jen.follow!(id)
  end

  def admin?
    admin
  end

end
