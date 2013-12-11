class Api::CommentsController < ApplicationController
  respond_to :json
  
  def index
    @comments = Establishment.find(params[:establishment_id]).comments.order(created_at: :desc)
  end

  def show
    # @comment = Comment.find(params[:id])
  end

  def create 
    body = params[:body]
    id = params[:establishment_id]
    @comment = if body && !body.blank?
      body.strip!
      current_user.comments.create!(establishment_id: id, body: body)
    end
  end

  def destroy 
    comment = Comment.find(params[:id])
    if current_user.id == comment.user_id
      if comment.destroy
        render json: { success: true }
      end
    end
  end
end
