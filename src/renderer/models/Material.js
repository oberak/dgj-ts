import mongoose from 'mongoose'
const { Schema } = mongoose

const Material = new Schema({
  code: String,
  name: String,
  price: Number,
  dc: {
    value: Number,
    unit: String,
  },
  desc: String,
})

Material.virtual('discount').get(function () {
  return `${this.dc.value || ''} ${this.dc.unit || ''}`
})

/**
 * Create material
 */
Material.statics.create = function (form) {
  const material = new this({
    code: form.code,
    name: form.name,
    price: form.price || 0,
    dc: form.dc || { value: 0, unit: '' },
    desc: form.desc,
  })
  return material.save()
}

/**
 * Update material
 */
Material.statics.update = function (id, form) {
  const data = {
    $set: {
      code: form.code,
      name: form.name,
      price: form.price || 0,
      dc: form.dc || { value: 0, unit: '' },
      desc: form.desc,
    },
  }

  return this.findByIdAndUpdate(id, data).exec()
}

/**
 * Delete material
 */
Material.statics.delete = function (id) {
  return this.findByIdAndRemove(id).exec()
}

/**
 * Select materials
 */
Material.statics.select = function (query = {}) {
  return this.find(query).exec()
}

export default mongoose.model('Materials', Material)
