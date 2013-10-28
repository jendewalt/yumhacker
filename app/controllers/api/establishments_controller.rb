class Api::EstablishmentsController < ApplicationController
  respond_to :json
  
	def index
		@establishments = Establishment.all
	end

  def show
    @establishment = Establishment.find(params[:id])
  end
end