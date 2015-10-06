class GameController < ApplicationController
	def index
		if session[:user_id] 
			gon.user_id = session[:user_id]
			render :index
		else
			redirect_to '/sessions'
		end
	end

end