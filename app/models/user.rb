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

  has_attached_file :avatar, :styles => { :medium => "200x200#", :small => "100x100#", :thumb => "30x30#" }, :default_url => "/missing.png"

  def following?(id)
    relationships.where(:followed_id => id).count > 0
  end

  def follow!(id)
    relationships.create!(:followed_id => id)
  end

  def unfollow!(id)
    relationships.where(:followed_id => id).first.try(:destroy)
  end

  def endorsing?(id)
    endorsements.where(:establishment_id => id).count > 0
  end

  def endorse!(id)
    endorsements.create!(:establishment_id => id)
  end

  def unendorse!(id)
    endorsements.where(:establishment_id => id).first.try(:destroy)
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create( first_name:auth.info.first_name,
                          last_name:auth.info.last_name,
                          provider:auth.provider,
                          uid:auth.uid,
                          email:auth.info.email,
                          password:Devise.friendly_token[0,20]
                          )
      begin
        user.avatar = URI.parse(auth.info.image)
        user.save
      rescue
      end
    end
    user
  end

  def self.find_for_twitter_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create( first_name:auth.info.first_name,
                          last_name:auth.info.last_name,
                          provider:auth.provider,
                          uid:auth.uid,
                          # email:auth.info.email,
                          password:Devise.friendly_token[0,20]
                          )
      begin
        user.avatar = URI.parse(auth.info.image)
        user.save
      rescue
      end
    end
    user
  end
end
