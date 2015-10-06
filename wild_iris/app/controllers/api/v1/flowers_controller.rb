class Api::V1::FlowersController < ApplicationController
	def index
		flowers = Flower.all
		render json: flowers
	end

	def show
		flower = Flower.find(params[:id])
		render json: flower
	end


	def update
		flower = Flower.find(params[:id])
		flower.update(flower_params)
		render json: flower
	end

	def byuserindex
		flowers = Flower.where({user_id: params[:user_id]})
		render json: flowers
	end

	def byusershow
		flower = Flower.find_by({user_id: params[:user_id], name: params[:flower_name]})
		render json: flower
	end

	def byuserupdate
		flower = Flower.find_by({user_id: params[:user_id], name: params[:flower_name]})
		flower.update(flower_params)
		render json: flower
	end

	private

	def flower_params
		params.permit(:fed_cap, :unlocked, :secret_unlocked, :secret_opt_out, :alive)
	end
end