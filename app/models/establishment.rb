class Establishment < ActiveRecord::Base
  set_rgeo_factory_for_column(:latlng, RGeo::Geographic.spherical_factory(:srid => 4326))

  has_many :endorsements, :dependent => :destroy
  has_many :users, :through => :endorsements
  has_many :hours, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_many :photos, -> { order('created_at DESC') }, :dependent => :destroy
  has_many :preview_photos, -> { order('created_at DESC').limit(4) }, :class_name => 'Photo'
  has_many :listings, :dependent => :destroy
  has_many :lists, :through => :listings
  has_many :categorizations, :dependent => :destroy
  has_many :categories, :through => :categorizations

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  def slug_candidates
      [
        :name,
        [:name, :city],
        [:name, :street, :city],
        [:name, :street_number, :street, :city]
      ]
  end

  def path
    if state && city
      'restaurants/' + state.parameterize + '/' + city.parameterize + '/' + slug
    else
      'restaurants/na/na/' + slug
    end
  end

  def self.from_users_followed_by(user)
    joins(:endorsements).group('establishments.id').where(%{endorsements.user_id IN (#{Relationship.select(:followed_id).where(:follower_id => user.id).to_sql})}, :user_id => user.id).references(:relationships)
  end

  def self.by_category(array)
    if array.empty?
      all
    else
      includes(:categories).where('categorizations.category_id IN (?)', array).references(:categorizations)
    end
  end

  def self.within_radius(lat, lng, radius)
    # convert miles to degrees = 1.0/(60 * 1.15078)
    includes(:hours).includes(:categories).where("ST_Contains(ST_Expand(ST_geomFromText('POINT (? ?)', 4326), ?), establishments.latlng :: geometry)", lng.to_f, lat.to_f, radius.to_f * 1.0/(60 * 1.15078)).order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry").references(:establishments)
  end

  def self.within_bounds(xmin, ymin, xmax, ymax, lat, lng)
    includes(:hours).includes(:categories).where("ST_Contains(ST_MakeEnvelope(?, ?, ?, ?, 4326), establishments.latlng :: geometry)", xmin, ymin, xmax, ymax).order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry").references(:establishments)
  end
end
