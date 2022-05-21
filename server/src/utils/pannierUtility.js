module.exports = {

	// util
	isAlreadyAdded (Pannier, idUser, idProduct, callback) {
		Pannier.findOne({
			where: {
				UserId: idUser,
				ProduitId: idProduct
			}
		}).then(pannier => {
			callback(null, pannier)
		}).catch(error => {
			callback(error, null)
		})
	}
}