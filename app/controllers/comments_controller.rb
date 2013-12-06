class CommentsController < ApplicationController
  before_filter :authenticate_user!

  def create
  end

  def destroy
  end

  private
    def establishment_params
      params.permit(:body, :establishment_id, :username, :establishment_name)
    end
end