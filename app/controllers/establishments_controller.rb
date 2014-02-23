class EstablishmentsController < ApplicationController
  before_filter :authorize

  def edit
    @establishment = Establishment.friendly.find(params[:id])
  end

  private

    def authorize
      redirect_to '/' unless current_user && current_user.admin?
    end
end
