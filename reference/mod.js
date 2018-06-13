mod.data = {
	cloudName: 'anymod-demo',
	uploadPreset: 'dfolqlzl',
	cardImage: 'https://res.cloudinary.com/component/image/upload/v1528847502/upload-arrow.png',
	highlight: false
}
	
mod.methods = {
	setHighlight: function (val) {
		mod.data.highlight = val
	},
	handleFileDrop (e) {
		this.setHighlight(false)
		this.uploadFile(e.dataTransfer.files[0])
	},
	handleFileInput (e) {
		this.setHighlight(false)
		this.uploadFile(e.target.files[0])
	},
	clickFileInput () {
		this.$refs.fileInput.click()	
	},
	uploadFile (file) {
		if (!file || !file.name) return
		let formdata = new FormData()

		formdata.append('file', file)
		formdata.append('cloud_name', mod.data.cloudName)
		formdata.append('upload_preset', mod.data.uploadPreset)

		let xhr = new XMLHttpRequest()
		xhr.open('POST', 'https://api.cloudinary.com/v1_1/' + mod.data.cloudName + '/image/upload', true)

		xhr.onload = function () {
			// do something to response
			let response = JSON.parse(this.responseText)
			console.log('response', response)
			mod.data.cardImage = response.secure_url
		}
		xhr.send(formdata)
	}
}