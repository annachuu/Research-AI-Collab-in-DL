const mongoose = require('mongoose')

/**
 * Schema for a Document.
**/

const RIL_Schema = mongoose.Schema(
  {
    documentId: {type: String, default: null},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },    
    workspaceId: {type: mongoose.Schema.Types.ObjectId, default: null},
    queryId: {type: mongoose.Schema.Types.ObjectId, default: null},   
    queryName: {type: String, default: null},
    title: { type: String, required: [true, 'Please add a document title']},
    doc_type: {type: String, default: null},
    doc_authors: {type: Array, default: []},
    doc_abstract: {type: String, default: null},
    doc_date: {type: Array, default: []},
    doc_thumbnail : {type: String, default: null},
    thumbnail_type: {type: String, default: null},
    doc_partof : {type: String, default: null},
    doc_peerreview : {type: Boolean, default: null},
    doc_openaccess : {type: Boolean, default: null},
    doc_fulltext : {type: String, default: null},
    doc_onlineaccess : {type: String, default: null},
    doc_getPdf : {type: String, default: null},
    doc_downloadPdf : {type: String, default: null},
      doc_url : {type: String, default: null}
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('RILDocument', RIL_Schema)
