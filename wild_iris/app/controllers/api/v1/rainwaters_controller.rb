class Api::V1::RainwatersController < ApplicationController
	def index
		rainwaters = Rainwater.all
		render json: rainwaters
	end

	def show
		rainwater = Rainwater.find(params[:id])
		render json: rainwater
	end

	def update
		rainwater = Rainwater.find(params[:id])
		rainwater.update(rainwater_params)
		render json: rainwater
	end

	private

	def rainwater_params
		params.permit(:total_amount)
	end
end