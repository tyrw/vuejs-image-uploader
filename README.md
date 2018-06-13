# Image uploader with Vue.js

Use [Vue.js](https://vuejs.org/v2/guide/instance.html#Data-and-Methods), [Anymod](https://anymod.com), and [Cloudinary](https://cloudinary.com) to build an image uploader.

Works without any build steps.

<img src="https://res.cloudinary.com/component/image/upload/v1528852456/uploader_pzc0ty.png">

## Image uploader mod

[Starting mod](https://anymod.com/mod/rdmao)
- Based on Materialize CSS [card](https://materializecss.com/cards.html)

[Finished mod](https://anymod.com/mod/anabo)
- Drag or drop to upload
- Paste install code to add it anywhere

### Step 1

Make the file input button work:

```html
<input type="file" @change="handleFileInput"/>
```

```js
mod.data = {
  cloudName: 'anymod-demo', // Add your cloud name
  uploadPreset: 'dfolqlzl', // Add your upload preset
  cardImage: 'https://res.cloudinary.com/component/image/upload/v1528847502/upload-arrow.png',
}

// Using ES6 syntax
mod.methods = {
  handleFileInput (e) {
    this.uploadFile(e.target.files[0])
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
      // Parse response & set card image
      let response = JSON.parse(this.responseText)
      mod.data.cardImage = response.secure_url
    }
    xhr.send(formdata)
  }
}
```

Now uploading works by clicking on the file upload input.

### Step 2

Make drag & drop look nice

```html
<form class="card"
  :class="{ highlight: highlight }"
  @dragenter.prevent="setHighlight(true)"
  @dragover.prevent="setHighlight(true)"
  @dragleave.prevent="setHighlight(false)"
  @dragend.prevent="setHighlight(false)">
```

```css
/* Add CSS rules */
.highlight,
.card:hover {
  cursor: pointer;
  box-shadow: 0 3px 30px red;
}
```

```js
mod.data = {
  cloudName: 'anymod-demo',
  uploadPreset: 'dfolqlzl',
  cardImage: 'https://res.cloudinary.com/component/image/upload/v1528847502/upload-arrow.png',
  highlight: false // Add highlight variable
}
```

```js
// Add to mod.methods (using ES5 syntax)
setHighlight: function (val) {
  mod.data.highlight = val
},
```

### Step 3

Make drag & drop work

```html
<!-- Add @drop function called handleFileDrop -->
<form class="card"
  :class="{ highlight: highlight }"
  @dragenter.prevent="setHighlight(true)"
  @dragover.prevent="setHighlight(true)"
  @dragleave.prevent="setHighlight(false)"
  @dragend.prevent="setHighlight(false)"
  @drop.prevent="handleFileDrop">
```

```js
// Add to mod.methods 
handleFileDrop (e) {
  this.setHighlight(false)
  this.uploadFile(e.dataTransfer.files[0])
},
```

### Step 4

Hide the file input, and make card click trigger a file input click

```css
/* Hide the file input */
input[type="file"] {
  display: none;	
}
```

```html
<!-- Add @click function called clickFileInput -->
<form class="card"
	:class="{ highlight: highlight }"
  @dragenter.prevent="setHighlight(true)"
  @dragover.prevent="setHighlight(true)"
  @dragleave.prevent="setHighlight(false)"
  @dragend.prevent="setHighlight(false)"
  @drop.prevent="handleFileDrop"
  @click="clickFileInput">

  ...


  <!-- Add ref="fileInput" to the file input -->
  <input type="file" ref="fileInput" @change="handleFileInput"/>
```

```js
// Add to mod.methods 
clickFileInput () {
  this.$refs.fileInput.click()	
},
```

### Add anywhere

Your file upload mod is working; now you can add it to any web page and it'll work!.

```html
<div id="anymod-anabo"></div>

<!-- Place before closing </body> tag -->
<script project="855EM8" src="https://cdn.anymod.com/v1"></script>
```