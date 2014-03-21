class Api::ListingsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create]
  before_filter :authorize, :only => [:create]

  def index
    @listings = List.find(params[:id]).listings
  end
  
  def create
    establishment_id = params[:establishment_id]
    @listing = @list.listings.new(establishment_id: establishment_id)
    current_user.endorse!(establishment_id) unless current_user.endorsing?(establishment_id)
   
    begin 
      @list.save

      if params[:comment] && !params[:comment].blank?
        @listing.build_comment(body: params[:comment], user_id: current_user.id) 
        @listing.comment.save 
      end
   
      render nothing: true, status: 201
    rescue
      render nothing: true, status: 409
    end
  end

  def destroy
    @listing = Listing.find(params[:id])

    @listing.destroy if current_user.list_ids.include?(@listing.list_id)

    render nothing: true, status: 200
  end

  private

    def authorize
      if params[:list_id]
        @list = List.find(params[:list_id])
      elsif params[:wish_list]
        @list = current_user.lists.where(wish_list: true).first
      end
      render nothing: true, status: 401 and return unless @list.user == current_user
    end
end
