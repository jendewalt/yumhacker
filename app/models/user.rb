class User < ActiveRecord::Base
  devise :database_authenticatable, :lockable, :omniauthable, :registerable,
        :recoverable, :rememberable, :trackable, :validatable

  has_many :relationships, :foreign_key => 'follower_id', :dependent => :destroy
  has_many :followed_users, :through => :relationships, :source => :followed

  has_many :reverse_relationships, :foreign_key => 'followed_id', :class_name => 'Relationship', :dependent => :destroy
  has_many :followers, :through => :reverse_relationships, :source => :follower

  has_many :endorsements, :dependent => :destroy
  has_many :establishments, :through => :endorsements

  has_many :comments, :dependent => :destroy

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

  def create_comment!(id, body)
    if body && !body.blank?
      body.strip!
      comments.create!(:establishment_id => id, :body => body)
    end
  end

  def destroy_comment!(id)
    logger.debug('############################')
    logger.debug(id)
    comments.where(:id => id).first.try(:destroy)
  end
end
